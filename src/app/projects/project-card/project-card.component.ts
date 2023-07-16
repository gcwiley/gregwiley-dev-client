import { Component, Input } from '@angular/core';

// import the product type
import { Project } from 'src/app/types/project.interface';

@Component({
	selector: 'app-project-card',
	templateUrl: './project-card.component.html',
	styleUrls: ['./project-card.component.scss'],
	standalone: true,
})
export class ProjectCardComponent {
	@Input() project!: Project
}
