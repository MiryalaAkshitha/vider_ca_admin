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
  items?: [];
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
  serviceType: string;
  documents: string[];
  deliverables: string[];
  recurring: boolean;
  frequency: string;
  frequencyPeriods: Array<Period>;
  mileStones: Array<MileStone>;
  description: Array<DescriptionItem>;
  repeated: boolean;
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
