// import the project status interface
import { ProjectStatus } from "../types/project.interface";

// define the data values for project status
export const PROJECT_STATUS: Status[] = [
  { value: 'not-started', viewValue: 'Not Started' },
  { value: 'in-development', viewValue: 'In Development' },
  { value: 'completed', viewValue: 'Completed' },
];

// define the data values for project category
export const PROJECT_CATAGORIES: Category[] = [
  { value: 'tutorial', viewValue: 'Web Tutorial' },
  { value: 'personal-project', viewValue: 'Personal Project' },
  { value: 'arc-gis-project', viewValue: 'ArcGIS Project' },
];

// define the data values for project language
export const PROJECT_LANGUAGE: Language[] = [
  { value: 'JavaScript', viewValue: 'JavaScript' },
  { value: 'Python', viewValue: 'Python' },
  { value: 'Dart', viewValue: 'Dart' },
];
