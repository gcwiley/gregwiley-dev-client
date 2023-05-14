import { Component, OnInit } from '@angular/core';

// import the project service
import { ProjectService } from '../../services/project.service';

// import project interface
import { Project } from 'src/app/types/project.interface';

@Component({
	selector: 'app-recent-projects',
	templateUrl: './recent-projects.component.html',
	styleUrls: ['./recent-projects.component.scss'],
})
export class RecentProjectsComponent implements OnInit {
	recentProjects!: Project[];

	constructor(private projectService: ProjectService) {}

	ngOnInit(): void {
		this.getRecentProjects();
	}

	getRecentProjects(): void {
		this.projectService
			.getRecentProjects()
			.subscribe((recentProjects) => (this.recentProjects = recentProjects));
	}
}
