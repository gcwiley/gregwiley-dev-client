import { ChangeDetectionStrategy, Component } from '@angular/core';

// import the angular material
import { MatDividerModule } from '@angular/material/divider';

// import the shared components
import { NavbarComponent, FooterComponent, AnnouncementBannerComponent  } from '../../../components';

// import the project grid component
import { ProjectGridComponent } from '../../../projects';

@Component({
    standalone: true,
    selector: 'app-project-grid-page',
    templateUrl: './project-grid-page.component.html',
    styleUrls: ['./project-grid-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDividerModule,
        NavbarComponent,
        AnnouncementBannerComponent,
        FooterComponent,
        ProjectGridComponent,
    ]
})
export class ProjectGridPageComponent {
   text =
      'I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.';
}
