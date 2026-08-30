import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

// rxjs fix this!
import { of, Observable, map, filter, switchMap, catchError } from 'rxjs';

// angular material - fix this!
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// shared components
import {
  Navbar,
  Footer,
} from '../../../components';

// project components
import {
  ProjectDetails,
  ProjectDescription,
  ProjectTags,
} from '../../../projects';

@Component({
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.html',
  styleUrl: './project-details-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Navbar,
    Footer,
    ProjectDetails,
    ProjectDescription,
    ProjectTags,
    RouterModule,
    MatIconModule,
],
})
export class ProjectDetailsPage {}
