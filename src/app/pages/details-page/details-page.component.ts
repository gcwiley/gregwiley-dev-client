import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import the project type
import { Project } from 'src/app/types/project.interface';

// import the project service
import { ProjectService } from 'src/app/services/project.service';

@Component({
	selector: 'app-details-page',
	templateUrl: './details-page.component.html',
	styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit {
	project!: Project;

	constructor(
		private route: ActivatedRoute,
		private projectService: ProjectService
	) {}

	ngOnInit(): void {
		this.getProject();
	}

	// GET project by id
	getProject(): void {
		const id = this.route.snapshot.paramMap.get('id')!;
		this.projectService
			.getProject(id)
			.subscribe((project) => (this.project = project));
	}
}
