import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// import angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

export interface Topic {
  name: string;
  description: string;
}

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule],
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
      description: 'Extensive experience using CSS, HTML, and JavaScript',
    },
    {
      name: 'Git',
      description: 'Very active on GitHub',
    },
  ];
}
