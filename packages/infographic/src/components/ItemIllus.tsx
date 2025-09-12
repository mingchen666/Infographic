/** @jsxImportSource @antv/infographic-jsx */
import type { RectProps } from '@antv/infographic-jsx';
import { Rect } from '@antv/infographic-jsx';

export interface ItemIllusProps extends RectProps {}

export const ItemIllus = (props: ItemIllusProps) => {
  const defaultProps: RectProps = {
    fill: 'lightgray',
  };
  return <Rect {...defaultProps} {...props} />;
};
