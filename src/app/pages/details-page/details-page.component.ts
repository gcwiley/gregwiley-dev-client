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

	descriptionText =
		'No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him. No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.';

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
