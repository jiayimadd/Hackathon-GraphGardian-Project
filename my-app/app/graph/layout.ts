export const CONTAINER_PADDING = 10;
export const CONTAINER_WIDTH = 200;
export const ITEM_WIDTH = 180;
export const ITEM_HEIGHT = 50;
export const ITEM_PADDING = 10;
export const ITEM_MARGIN = 10;

export const getItemPosition = (idx: number) => {
  return {
    x: CONTAINER_PADDING,
    y: CONTAINER_PADDING + (ITEM_HEIGHT + ITEM_MARGIN) * (idx + 1),
  };
};

export const getContainerHeight = (itemCount: number) => {
  return (
    CONTAINER_PADDING * 2 +
    (ITEM_HEIGHT + ITEM_MARGIN) * (itemCount + 1) -
    ITEM_MARGIN
  );
};
