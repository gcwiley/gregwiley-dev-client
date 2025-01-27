import { Component } from '@angular/core';

// import the shared components
import { HeaderComponent, FooterComponent } from '../../../components';

// import the project components
import { ProjectFormComponent, RecentProjectsComponent } from '../../../projects';

@Component({
    standalone: true,
    selector: 'app-project-create-page',
    templateUrl: './project-create-page.component.html',
    styleUrls: ['./project-create-page.component.scss'],
    imports: [
        HeaderComponent,
        FooterComponent,
        ProjectFormComponent,
        RecentProjectsComponent,
    ]
})
export class ProjectCreatePageComponent {}
