const INDEX_KEY = '\\d+(_\\d+)*';
const ITEM_PATTERN = `item-${INDEX_KEY}`;

const REGEXP = {
  btnAdd: new RegExp(`^btn-add-${INDEX_KEY}$`),
  btnRemove: new RegExp(`^btn-remove-${INDEX_KEY}$`),
  btnsGroup: /^btns-group$/,
  desc: /^desc$/,
  editArea: /^edit-area$/,
  illus: /^illus(?:-\w+)+$/,
  itemDesc: new RegExp(`^${ITEM_PATTERN}-desc$`),
  itemElement: new RegExp(`^${ITEM_PATTERN}`),
  itemGroup: new RegExp(`^${ITEM_PATTERN}$`),
  itemIcon: new RegExp(`^${ITEM_PATTERN}-icon`),
  itemIconGroup: new RegExp(`^${ITEM_PATTERN}-group-icon$`),
  itemIllus: new RegExp(`^${ITEM_PATTERN}-illus(?:-\\w+)*$`),
  itemLabel: new RegExp(`^${ITEM_PATTERN}-label$`),
  itemsGroup: /^items-group$/,
  itemShape: new RegExp(`^${ITEM_PATTERN}-shape(?:-\\w+)*$`),
  itemShapesGroup: new RegExp(`^${ITEM_PATTERN}-union-shapes(?:-\\w+)*$`),
  itemStaticElement: new RegExp(`^${ITEM_PATTERN}-static(?:-\\w+)*$`),
  itemValue: new RegExp(`^${ITEM_PATTERN}-value$`),
  shape: /^shape-/,
  shapesGroup: /^union-shapes(?:-\w+)*$/,
  title: /^title$/,
};

const is = (element: SVGElement, regexp: RegExp) => {
  return element.id ? regexp.test(element.id) : false;
};
export const isSVG = (element: any): element is SVGSVGElement =>
  element instanceof SVGElement && element.tagName === 'svg';
export const isTitle = (element: SVGElement) => is(element, REGEXP.title);
export const isDesc = (element: SVGElement) => is(element, REGEXP.desc);
export const isShape = (element: SVGElement) => is(element, REGEXP.shape);
export const isIllus = (element: SVGElement) => is(element, REGEXP.illus);
export const isText = (element: SVGElement): element is SVGTextElement =>
  element instanceof SVGElement && element.tagName === 'text';
export const isGroup = (element: SVGElement): element is SVGGElement =>
  element instanceof SVGElement && element.tagName === 'g';
export const isShapeGroup = (element: SVGElement) =>
  is(element, REGEXP.shapesGroup);
export const isItemsGroup = (element: SVGElement) =>
  is(element, REGEXP.itemsGroup);
export const isItemElement = (element: SVGElement) =>
  is(element, REGEXP.itemElement);
export const isItemGroup = (element: SVGElement) =>
  is(element, REGEXP.itemGroup);
export const isItemIcon = (element: SVGElement) => is(element, REGEXP.itemIcon);
export const isItemIconGroup = (element: SVGElement) =>
  is(element, REGEXP.itemIconGroup);
export const isItemLabel = (element: SVGElement) =>
  is(element, REGEXP.itemLabel);
export const isItemDesc = (element: SVGElement) => is(element, REGEXP.itemDesc);
export const isItemValue = (element: SVGElement) =>
  is(element, REGEXP.itemValue);
export const isItemIllus = (element: SVGElement) =>
  is(element, REGEXP.itemIllus);
export const isItemShape = (element: SVGElement) =>
  is(element, REGEXP.itemShape);
export const isItemShapesGroup = (element: SVGElement) =>
  is(element, REGEXP.itemShapesGroup);
export const isItemStaticElement = (element: SVGElement) =>
  is(element, REGEXP.itemStaticElement);
export const isEditArea = (element: SVGElement) => is(element, REGEXP.editArea);
export const isBtnsGroup = (element: SVGElement) =>
  is(element, REGEXP.btnsGroup);
export const isBtnAdd = (element: SVGElement) => is(element, REGEXP.btnAdd);
export const isBtnRemove = (element: SVGElement) =>
  is(element, REGEXP.btnRemove);
