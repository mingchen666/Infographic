/** @jsxImportSource @antv/infographic-jsx */
import type { TextProps } from '@antv/infographic-jsx';
import { Text } from '@antv/infographic-jsx';

export interface ItemLabelProps extends TextProps {}

export const ItemLabel = (props: ItemLabelProps) => {
  const defaultProps: TextProps = {
    fontSize: 18,
    fontWeight: 'bold',
    fill: '#000',
    width: 100,
    height: 26,
    lineHeight: 1.4,
  };
  return <Text {...defaultProps} {...props} />;
};
