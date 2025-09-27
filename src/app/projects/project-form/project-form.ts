import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// rxjs
import { of } from 'rxjs';
import { first, switchMap } from 'rxjs';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// project service and interfaces
import { ProjectService } from '../../services/project.service';

import {
  ProjectInput,
  ProjectStatus,
  ProjectCategory,
  ProjectLanguage,
} from '../../types/project.interface';

// project data values
import {
  PROJECT_STATUS,
  PROJECT_LANGUAGE,
  PROJECT_CATEGORIES,
} from '../../../assets/data/project-data';

@Component({
  standalone: true,
  selector: 'app-project-form',
  templateUrl: './project-form.html',
  styleUrls: ['./project-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class ProjectForm implements OnInit {
  public mode: 'create' | 'edit' = 'create';
  private id!: string | null;
  private readonly snackBarDuration = 5000;

  statuses: ProjectStatus[] = PROJECT_STATUS;
  categories: ProjectCategory[] = PROJECT_CATEGORIES;
  languages: ProjectLanguage[] = PROJECT_LANGUAGE;

  // inject dependencies
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private snackBar = inject(MatSnackBar);

  // create the project form
  projectForm = this.formBuilder.group({
    title: ['', Validators.required],
    status: ['', Validators.required],
    category: ['', Validators.required],
    programmingLanguage: ['', Validators.required],
    startDate: ['', Validators.required],
    gitUrl: ['', Validators.required],
    description: ['', Validators.required],
  });

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(
        first(),
        switchMap((paramMap: ParamMap) => {
          if (paramMap.has('id')) {
            this.mode = 'edit';
            this.id = paramMap.get('id');
            return this.projectService.getProjectById(this.id!);
          } else {
            this.mode = 'create';
            return of(undefined);
          }
        })
      )
      .subscribe((project) => {
        if (project) {
          // use patchValue for satety, and map the data correctly
          this.projectForm.patchValue({
            ...project,
            startDate: project.startDate ? new Date(project.startDate).toISOString() : '',
          });
        }
      });
  }

  // saves a new project
  public onSaveProject(): void {
    if (!this.projectForm.valid) {
      return;
    }

    const formValue = this.projectForm.value as ProjectInput;

    if (this.mode === 'create') {
      this.projectService
        .addProject(formValue)
        .pipe(first())
        .subscribe({
          next: () => {
            this.snackBar.open('Project added', 'Close', { duration: this.snackBarDuration });
            this.router.navigateByUrl('/');
          },
          error: (error) => {
            console.error(error);
            this.snackBar.open('Error adding project', 'Close', {
              duration: this.snackBarDuration,
            });
          },
        });
    } else {
      this.projectService
        .updateProjectById(this.id!, formValue)
        .pipe(first())
        .subscribe({
          next: () => {
            this.snackBar.open('Project updated successfully', 'Close', {
              duration: this.snackBarDuration,
            });
            this.router.navigate(['/projects', this.id]);
          },
          error: (error) => {
            console.error(error);
            this.snackBar.open('Error updating project', 'Close', {
              duration: this.snackBarDuration,
            });
          },
        });
    }
  }

  // navigates away from the form without saving
  public onCancel(): void {
    const destination = this.mode === 'edit' ? `/projects/${this.id}` : '/projects';
    this.router.navigateByUrl(destination);
  }
}
