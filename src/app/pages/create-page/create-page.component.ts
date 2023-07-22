import { Component } from '@angular/core';

// import shared components
import { HeaderComponent, FooterComponent } from 'src/app/shared';

// import project components
import { ProjectFormComponent, RecentProjectsComponent } from 'src/app/projects';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ProjectFormComponent, RecentProjectsComponent],
})
export class CreatePageComponent {}
