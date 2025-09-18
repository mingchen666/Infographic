/** @jsxImportSource @antv/infographic-jsx */
import type { RectProps } from '@antv/infographic-jsx';
import { Rect } from '@antv/infographic-jsx';
import { getItemKeyFromIndexes } from '../../utils';

export interface IllusProps extends RectProps {
  indexes?: number[];
}

export const Illus = ({ indexes, ...props }: IllusProps) => {
  const defaultProps: RectProps = {
    fill: 'lightgray',
  };
  const finalProps = { ...defaultProps, ...props };

  if (indexes?.length) {
    finalProps.id = `item-${getItemKeyFromIndexes(indexes)}-illus`;
  }

  return <Rect {...finalProps} />;
};
