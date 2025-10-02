// define the project interface
export interface Project {
  _id: string;
  title: string;
  status: string;
  category: string;
  programmingLanguage: string;
  keywords: string;
  startDate: string;
  favoriteProject: boolean;
  gitUrl: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type ProjectInput = Omit<Project, '_id'>

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
