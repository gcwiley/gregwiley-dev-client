import { Component, OnInit } from '@angular/core';

// Imports the project service
import { ProjectService } from '../../services/project.service';

// Import the project type
import { Project } from '../../types/project.interface';

@Component({
	selector: 'app-project-grid',
	templateUrl: './project-grid.component.html',
	styleUrls: ['./project-grid.component.scss'],
})
export class ProjectGridComponent implements OnInit {
	projects: Project[] = [];

	constructor(private projectService: ProjectService) {}

	ngOnInit(): void {
		this.getProjects();
	}

	getProjects(): void {
		this.projectService.getProjects().subscribe((projects) => {
			this.projects = projects;
		});
	}
}
