import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// import the angular material modules
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
   selector: 'app-skill-list',
   templateUrl: './skill-list.component.html',
   styleUrls: ['./skill-list.component.scss'],
   standalone: true,
   imports: [CommonModule, MatCardModule, MatListModule, MatDividerModule],
})
export class SkillListComponent {}
