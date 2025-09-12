/** @jsxImportSource @antv/infographic-jsx */
import type { TextProps } from '@antv/infographic-jsx';
import { Text } from '@antv/infographic-jsx';

export interface ItemDescProps extends TextProps {}

export const ItemDesc = (props: ItemDescProps) => {
  const defaultProps: TextProps = {
    width: 100,
    height: 40,
    fontSize: 14,
    fill: '#666',
    wordWrap: true,
    lineHeight: 1.4,
  };
  return <Text {...defaultProps} {...props} />;
};
