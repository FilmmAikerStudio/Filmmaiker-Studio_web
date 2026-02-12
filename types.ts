
export interface FrameData {
  index: number;
  url: string;
}

export interface SectionContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  scrollPosition: [number, number]; // [start, end] in percentage of total scroll
}
