import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// project service and interface
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/project.interface';

@Component({
  standalone: true,
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class ProjectDescriptionComponent implements OnInit {
  project!: Project;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {}

  public ngOnInit(): void {
    this.getProjectById();
  }

  public getProjectById(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.projectService.getProjectById(id).subscribe((project) => (this.project = project));
  }
}
