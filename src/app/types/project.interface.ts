// interface can be used to create your own type - define fields and values
export interface Project {
	_id?: string;
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

// define project status interface
export interface Status {
	value: string;
	viewValue: string;
}

// Project Status Data Values
export const status: Status[] = [
	{ value: 'not-started', viewValue: 'Not Started' },
	{ value: 'in-development', viewValue: 'In Development' },
	{ value: 'completed', viewValue: 'Completed' },
];

// Project Category Data Type
export interface ProjectCategory {
	value: string;
	viewValue: string;
}

// Project Category Data Values
export const PROJECT_CATAGORIES: ProjectCategory[] = [
	{ value: 'tutorial', viewValue: 'Web Tutorial' },
	{ value: 'personal-project', viewValue: 'Personal Project' },
	{ value: 'arc-gis-project', viewValue: 'ArcGIS Project' },
];

// Project Language Data Type
export interface ProjectLanguage {
	value: string;
	viewValue: string;
}

// Project Language Data Values
export const PROJECT_LANGUAGE: ProjectLanguage[] = [
	{ value: 'JavaScript', viewValue: 'JavaScript' },
	{ value: 'Python', viewValue: 'Python' },
];
