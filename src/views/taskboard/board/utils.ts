export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  ON_HOLD = "on_hold",
  UNDER_REVIEW = "under_review",
  DONE = "done",
}

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const move = (
  source,
  destination,
  droppableSource,
  droppableDestination
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const colors = ["#149ECD", "#F7964F", "#F2353C", "#673AB7", "#8BC34A"];

export const getContainerHeight = (item: HTMLElement | null) => {
  let height = item ? item.getBoundingClientRect().y + 24 : 0;
  return `calc(100vh - ${height + "px"}) `;
};
