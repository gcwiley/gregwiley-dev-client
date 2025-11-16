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
  gitUrl?: string; // optional field
  description?: string; // optional field
  imageUrl?: string; // optional field
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

// payload to create a project (client -> server)
// excludes server-generated fields like _id, createdAt, updatedAt
export type ProjectInput = Omit<Project, '_id' | 'createdAt' | 'updatedAt'>

// --- HELPER INTERFACES FOR UI LIST ---

// defines the structure for project status options in a UI dropdown.
export interface ProjectStatus {
  value: string;
  viewValue: string;
}

// defines the structure for property category options in a UI dropdown.
export interface ProjectCategory {
  value: string;
  viewValue: string;
}

// defines the structure for programming language options in a UI dropdown.
export interface ProjectLanguage {
  value: string;
  viewValue: string;
}
