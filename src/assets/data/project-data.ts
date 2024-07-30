// import the project interfaces
import { ProjectStatus, ProjectCategory, ProjectLanguage } from '../../app/types/project.interface';

// define the data values for project status
export const PROJECT_STATUS: ProjectStatus[] = [
  { value: 'not-started', viewValue: 'Not Started' },
  { value: 'in-development', viewValue: 'In Development' },
  { value: 'completed', viewValue: 'Completed' },
];

// define the data values for project language
export const PROJECT_LANGUAGE: ProjectLanguage[] = [
  { value: 'JavaScript', viewValue: 'JavaScript' },
  { value: 'Python', viewValue: 'Python' },
  { value: 'Dart', viewValue: 'Dart' },
];

// define the data values for project category
export const PROJECT_CATAGORIES: ProjectCategory[] = [
  { value: 'tutorial', viewValue: 'Web Tutorial' },
  { value: 'personal-project', viewValue: 'Personal Project' },
  { value: 'arc-gis-project', viewValue: 'ArcGIS Project' },
];
