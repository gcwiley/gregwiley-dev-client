import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // used for both type of Forms

// import angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// import the project service
import { ProjectService } from '../../services/project.service';

// import the required project interfaces
import {
  Project,
  ProjectStatus,
  ProjectCategory,
  ProjectLanguage,
} from '../../types/project.interface';

// import the project data values
import { PROJECT_STATUS, PROJECT_CATAGORIES, PROJECT_LANGUAGE } from '../../data/project-data';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProjectFormComponent implements OnInit {
  public mode = 'create';
  private id!: string | null;
  private project!: Project;

  statues: ProjectStatus[] = PROJECT_STATUS;
  categories: ProjectCategory[] = PROJECT_CATAGORIES;
  languages: ProjectLanguage[] = PROJECT_LANGUAGE;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  // create the project form
  projectForm = this.formBuilder.group({
    title: ['', Validators.required],
    status: ['', Validators.required],
    category: ['', Validators.required],
    language: ['', Validators.required],
    startDate: ['', Validators.required],
    liveUrl: ['', Validators.required],
    gitUrl: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit(): void {
    // find out if we have a "id" or not
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.projectService.getProject(this.id).subscribe((project) => {
          this.project = project;
          // overrides values of initial form controls
          this.projectForm.setValue({
            // set value for every form control
            title: this.project.title,
            status: this.project.status,
            category: this.project.category,
            language: this.project.language,
            startDate: this.project.startDate,
            liveUrl: this.project.liveUrl,
            gitUrl: this.project.gitUrl,
            description: this.project.description,
          });
        });
      } else {
        this.mode = 'create';
        this.id = null;
      }
    });
  }

  onSaveProject(): void {
    if (this.mode === 'create') {
      this.projectService.addProject(this.projectForm.value).subscribe(() => {
        // navigates user back to homepage
        this.router.navigateByUrl('/');
      });
    } else {
      this.projectService.updateProject(this.projectForm.value).subscribe(() => {
        // navigates user back to homepage
        this.router.navigateByUrl('/');
      });
    }
  }
}
