import { ChangeDetectionStrategy, Component } from '@angular/core';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

export interface Skill {
   name: string;
   overview: string;
}

@Component({
   standalone: true,
   selector: 'app-skill-list',
   templateUrl: './skill-list.component.html',
   styleUrls: ['./skill-list.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [MatCardModule, MatListModule, MatDividerModule],
})
export class SkillListComponent {
   skills: Skill[] = [
      {
         name: 'JavaScript',
         overview: 'This is a test sentence.',
      },
      {
         name: 'HTML and CSS',
         overview: 'This is a test sentence.',
      },
      {
         name: 'Python',
         overview: 'This is a test sentence.',
      },
      {
         name: 'TypeScript',
         overview: 'This is a test sentence.',
      },
   ];
}
