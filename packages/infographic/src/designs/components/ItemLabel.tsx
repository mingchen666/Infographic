/** @jsxImportSource @antv/infographic-jsx */
import type { TextProps } from '@antv/infographic-jsx';
import { Text } from '@antv/infographic-jsx';
import { getItemKeyFromIndexes } from '../../utils';

export interface ItemLabelProps extends TextProps {
  indexes: number[];
}

export const ItemLabel = ({
  indexes,
  children = 'Item Label',
  ...props
}: ItemLabelProps) => {
  const defaultProps: TextProps = {
    fontSize: 18,
    fontWeight: 'bold',
    fill: '#000',
    width: 100,
    height: 26,
    lineHeight: 1.4,
    children,
    backgroundColor: 'rgba(199, 207, 145, 0.1)',
  };
  return (
    <Text
      {...defaultProps}
      {...props}
      id={`item-${getItemKeyFromIndexes(indexes)}-label`}
    />
  );
};
