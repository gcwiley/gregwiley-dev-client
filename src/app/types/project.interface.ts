// ISO 8601 date/time string
export type ISODateString = string;

// define the project interface
export interface Project {
  _id: string;
  title: string;
  status: string;
  category: string;
  programmingLanguage: string;
  keywords: string[]; // array of tag strings
  startDate: ISODateString | null;
  favoriteProject: boolean;
  gitUrl?: string; // optional 
  description?: string; // optional 
  imageUrl?: string; // optional
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

// payload to create a project (client -> server)
// excludes server-generated fields like _id, createdAt, updatedAt
export type ProjectInput = Omit<Project, '_id'>

// define the project status interface
export interface ProjectStatus {
  value: string;
  viewValue: string;
}

// helper interfaces for UI lists

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
