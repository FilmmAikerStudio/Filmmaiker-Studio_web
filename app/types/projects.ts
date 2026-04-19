interface ProjectUrl {
  text: string;
  url: string;
}

export interface Project {
  title: string;
  subtext: string;
  url?: string;
  urls?: ProjectUrl[];
}