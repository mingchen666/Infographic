/** @jsxImportSource @antv/infographic-jsx */
import type { RectProps } from '@antv/infographic-jsx';
import { Ellipse, Group, Rect } from '@antv/infographic-jsx';
import { getItemKeyFromIndexes } from '../../utils';

export interface ItemIconProps extends RectProps {
  indexes: number[];
  size?: number;
}

export const ItemIcon = (props: ItemIconProps) => {
  const { indexes, size = 32, ...restProps } = props;
  const finalProps: RectProps = {
    fill: 'lightgray',
    width: size,
    height: size,
    ...restProps,
  };
  return (
    <Rect {...finalProps} id={`item-${getItemKeyFromIndexes(indexes)}-icon`} />
  );
};

export const ItemIconCircle = (
  props: ItemIconProps & { colorBg?: string; padding?: number },
) => {
  const {
    indexes,
    size = 32,
    fill,
    colorBg = 'white',
    padding = 6,
    ...restProps
  } = props;
  const radius = size / Math.SQRT2 + padding;
  const width = radius * 2;
  const offset = (width - size) / 2;
  const iconProps: RectProps = {
    fill: colorBg,
    ...restProps,
    x: offset,
    y: offset,
    width: size,
    height: size,
  };

  const prefix = `item-${getItemKeyFromIndexes(indexes)}`;

  return (
    <Group {...restProps} width={width} height={width}>
      <Ellipse width={width} height={width} id={`${prefix}-bg`} fill={fill} />
      <Rect {...iconProps} id={`${prefix}-icon`} />
    </Group>
  );
};
