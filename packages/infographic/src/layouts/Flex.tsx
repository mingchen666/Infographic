/** @jsxImportSource @antv/infographic-jsx */
import {
  cloneElement,
  createLayout,
  getElementBounds,
  getElementsBounds,
  Group,
  type Bounds,
  type GroupProps,
  type JSXElement,
} from '@antv/infographic-jsx';

interface FlexLayoutProps extends GroupProps {
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between';
  alignItems?: 'flex-start' | 'flex-end' | 'center';
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between';
  flexWrap?: 'wrap' | 'nowrap';
  gap?: number;
}

export const FlexLayout = createLayout<FlexLayoutProps>(
  (
    children,
    {
      flexDirection = 'row',
      justifyContent = 'flex-start',
      alignItems = 'flex-start',
      alignContent = 'flex-start',
      flexWrap = 'nowrap',
      gap = 0,
      ...props
    },
  ) => {
    if (!children || children.length === 0) {
      return <Group {...props} />;
    }

    const isRow = flexDirection === 'row' || flexDirection === 'row-reverse';
    const isReverse =
      flexDirection === 'row-reverse' || flexDirection === 'column-reverse';

    const childBounds = children.map((child) => getElementBounds(child));

    const hasContainerSize =
      props.width !== undefined && props.height !== undefined;
    const containerWidth = props.width || 0;
    const containerHeight = props.height || 0;

    const lines: Array<{ children: JSXElement[]; bounds: Bounds[] }> = [];

    if (flexWrap === 'wrap' && hasContainerSize) {
      let currentLine: JSXElement[] = [];
      let currentLineBounds: Bounds[] = [];
      let currentLineSize = 0;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const bounds = childBounds[i];
        const childSize = isRow ? bounds.width : bounds.height;
        const maxSize = isRow ? containerWidth : containerHeight;

        if (
          currentLine.length === 0 ||
          currentLineSize + gap + childSize <= maxSize
        ) {
          currentLine.push(child);
          currentLineBounds.push(bounds);
          currentLineSize += (currentLine.length > 1 ? gap : 0) + childSize;
        } else {
          lines.push({ children: currentLine, bounds: currentLineBounds });
          currentLine = [child];
          currentLineBounds = [bounds];
          currentLineSize = childSize;
        }
      }

      if (currentLine.length > 0) {
        lines.push({ children: currentLine, bounds: currentLineBounds });
      }
    } else {
      lines.push({ children, bounds: childBounds });
    }

    const layoutedChildren: JSXElement[] = [];
    let currentCrossPos = 0;
    const crossSizes: number[] = [];

    lines.forEach((line, lineIndex) => {
      const { children: lineChildren, bounds: lineBounds } = line;

      const totalMainSize = lineBounds.reduce((sum, bounds, index) => {
        const childMainSize = isRow ? bounds.width : bounds.height;
        return sum + childMainSize + (index > 0 ? gap : 0);
      }, 0);

      const maxCrossSize = Math.max(
        ...lineBounds.map((bounds) => (isRow ? bounds.height : bounds.width)),
      );

      crossSizes.push(maxCrossSize);

      let mainStart = 0;
      const availableMainSpace =
        (isRow ? containerWidth : containerHeight) - totalMainSize;

      if (hasContainerSize) {
        switch (justifyContent) {
          case 'flex-end':
            mainStart = availableMainSpace;
            break;
          case 'center':
            mainStart = availableMainSpace / 2;
            break;
          case 'space-between':
            mainStart = 0;
            break;
          default:
            mainStart = 0;
            break;
        }
      }

      let itemSpacing = gap;
      if (
        hasContainerSize &&
        justifyContent === 'space-between' &&
        lineChildren.length > 1
      ) {
        itemSpacing = availableMainSpace / (lineChildren.length - 1) + gap;
      }

      let currentMainPos = mainStart;

      lineChildren.forEach((child, childIndex) => {
        const bounds = lineBounds[childIndex];
        const childMainSize = isRow ? bounds.width : bounds.height;
        const childCrossSize = isRow ? bounds.height : bounds.width;

        let crossPos = currentCrossPos;
        if (hasContainerSize) {
          switch (alignItems) {
            case 'flex-end':
              crossPos = currentCrossPos + maxCrossSize - childCrossSize;
              break;
            case 'center':
              crossPos = currentCrossPos + (maxCrossSize - childCrossSize) / 2;
              break;
            default:
              crossPos = currentCrossPos;
              break;
          }
        }

        let x: number, y: number;
        if (isRow) {
          x = isReverse
            ? containerWidth - currentMainPos - childMainSize
            : currentMainPos;
          y = crossPos;
        } else {
          x = crossPos;
          y = isReverse
            ? containerHeight - currentMainPos - childMainSize
            : currentMainPos;
        }

        const clonedChild = cloneElement(child, { x, y });
        layoutedChildren.push(clonedChild);

        currentMainPos += childMainSize + itemSpacing;
      });

      currentCrossPos += maxCrossSize + gap;
    });

    if (lines.length > 1 && hasContainerSize) {
      const totalCrossSize =
        crossSizes.reduce((sum, size) => sum + size, 0) +
        (lines.length - 1) * gap;
      const availableCrossSpace =
        (isRow ? containerHeight : containerWidth) - totalCrossSize;

      let crossOffset = 0;
      switch (alignContent) {
        case 'flex-end':
          crossOffset = availableCrossSpace;
          break;
        case 'center':
          crossOffset = availableCrossSpace / 2;
          break;
        case 'space-between':
          if (lines.length > 1) {
            const lineSpacing = availableCrossSpace / (lines.length - 1);
            let currentOffset = 0;

            lines.forEach((line, lineIndex) => {
              const lineStartIndex = lines
                .slice(0, lineIndex)
                .reduce((sum, l) => sum + l.children.length, 0);
              const lineEndIndex = lineStartIndex + line.children.length;

              for (let i = lineStartIndex; i < lineEndIndex; i++) {
                const child = layoutedChildren[i];
                const newProps = { ...child.props };
                if (isRow) {
                  newProps.y = (newProps.y || 0) + currentOffset;
                } else {
                  newProps.x = (newProps.x || 0) + currentOffset;
                }
                layoutedChildren[i] = cloneElement(child, newProps);
              }

              currentOffset +=
                crossSizes[lineIndex] +
                gap +
                (lineIndex < lines.length - 1 ? lineSpacing : 0);
            });
            break;
          }
        default:
          crossOffset = 0;
          break;
      }

      if (crossOffset !== 0 && alignContent !== 'space-between') {
        layoutedChildren.forEach((child, index) => {
          const newProps = { ...child.props };
          if (isRow) {
            newProps.y = (newProps.y || 0) + crossOffset;
          } else {
            newProps.x = (newProps.x || 0) + crossOffset;
          }
          layoutedChildren[index] = cloneElement(child, newProps);
        });
      }
    }

    if (!hasContainerSize) {
      const totalBounds = getElementsBounds(layoutedChildren);
      props.x ??= totalBounds.x;
      props.y ??= totalBounds.y;
      props.width ??= totalBounds.width;
      props.height ??= totalBounds.height;
    }

    return <Group {...props}>{layoutedChildren}</Group>;
  },
);
