import { ChangeDetectionStrategy, Component } from '@angular/core';

// import the angular material modules
import { MatChipsModule } from '@angular/material/chips';

@Component({
   standalone: true,
   selector: 'app-project-tags',
   templateUrl: './project-tags.component.html',
   styleUrls: ['./project-tags.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [MatChipsModule],
})
export class ProjectTagsComponent {}
