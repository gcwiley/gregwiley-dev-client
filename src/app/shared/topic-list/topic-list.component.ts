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
			description: 'Angular is an open source web application platform',
		},
		{
			name: 'Bootstrap',
			description: 'Bootstrap is an HTML, CSS, and JavaScript framework',
		},
		{
			name: 'CSS',
			description:
				'Cascading Style Sheets (CSS) is a language used most often to style and improve upon the appearance of websites.',
		},
		{
			name: 'Git',
			description:
				'Git is the most widely used version control system, which allows for the tracking and managing of source code over time.',
		},
	];
}
