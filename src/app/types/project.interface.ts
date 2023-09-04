// define the project interface
export interface Project {
  _id?: string | null;
  title: string;
  status: string;
  category: string;
  language: string;
  startDate: string;
  liveUrl: string;
  gitUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// define the project status interface
export interface ProjectStatus {
  value: string;
  viewValue: string;
}

// define the project category interface
export interface ProjectCategory {
  value: string;
  viewValue: string;
}

// define the project language interface
export interface ProjectLanguage {
  value: string;
  viewValue: string;
}
