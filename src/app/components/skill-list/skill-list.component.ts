import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
   selector: 'app-skill-list',
   templateUrl: './skill-list.component.html',
   styleUrls: ['./skill-list.component.scss'],
   standalone: true,
   imports: [CommonModule, MatCardModule, MatListModule],
})
export class SkillListComponent {}
