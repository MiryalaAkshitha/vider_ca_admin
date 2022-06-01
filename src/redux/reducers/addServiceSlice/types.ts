export type DeleteChecklistItem = {
  mIndex: number;
  cIndex: number;
};

export type Period = {
  period: string;
  startDate: string;
  endDate: string;
};

export type MileStone = {
  name: string;
  checklist: Array<string>;
  id: string;
};

export type UpdateFrequencyPayload = {
  index: number;
  name: "startDate" | "endDate";
  value: string;
};

export type UpdateMileStoneName = {
  index: number;
  value: string;
};

export type UpdateChecklistItem = {
  index: number;
  cIndex: number;
  value: string;
};

export type Item = {
  title: string;
  description?: string;
  items: Array<Item>;
  id: string;
};

export type ContentItem = {
  type: string;
  description?: string;
  id: string;
  items?: Array<Item>;
};

export type DescriptionItem = {
  title: string;
  id: string;
  items: Array<ContentItem>;
};

export interface IAddService {
  name: string;
  description: string;
  category: string;
  subCategory: string;
  categoryId: string | null;
  subCategoryId: string | null;
  hourlyPrice: string;
  totalPrice: string;
  checklists: Array<any>;
  milestones: Array<any>;
  stageOfWork: Array<any>;
  subTasks: Array<any>;
}

export type UpdateDate = {
  index: number;
  type: "startDate" | "endDate";
  date: string;
};

export type AddAccordionContent = {
  index: number;
  data: { title: string; description: string };
};
