import { Component } from '@angular/core';

export interface Topic {
	name: string;
	description: string;
}

@Component({
	selector: 'app-topic-list',
	templateUrl: './topic-list.component.html',
	styleUrls: ['./topic-list.component.scss'],
})
export class TopicListComponent {
	topics: Topic[] = [
		{
			name: 'Angular',
			description: 'This website was built using Angular',
		},
		{
			name: 'Bootstrap',
			description: 'Very family with this CSS framework',
		},
		{
			name: 'CSS',
			description:
				'Extensive experience using CSS, HTML, and JavaScript',
		},
		{
			name: 'Git',
			description:
				'Very active on GitHub',
		},
	];
}
