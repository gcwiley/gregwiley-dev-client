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
  isFavorite: boolean;
  gitUrl?: string; // optional field
  description?: string; // optional field
  imageUrl?: string; // optional field
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

// payload to create a project (client -> server)
// excludes server-generated fields like _id, createdAt, updatedAt
export type ProjectInput = Omit<Project, '_id' | 'createdAt' | 'updatedAt'>;

// --- HELPER INTERFACES FOR UI LIST ---

// single generic interface
export interface SelectOption<T = string> {
  value: T;
  viewValue: string;
}
