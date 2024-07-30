import { Component } from '@angular/core';

// import the angular material modules
import { MatChipsModule } from '@angular/material/chips';

@Component({
   selector: 'app-project-tags',
   templateUrl: './project-tags.component.html',
   styleUrls: ['./project-tags.component.scss'],
   standalone: true,
   imports: [MatChipsModule],
})
export class ProjectTagsComponent {}
