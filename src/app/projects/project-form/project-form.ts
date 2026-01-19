import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// rxjs
import { of } from 'rxjs';
import { first, switchMap, finalize } from 'rxjs';

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
import { ProjectInput, SelectOption } from '../../types/project.interface';

// project data values
import {
  PROJECT_STATUS,
  PROJECT_LANGUAGE,
  PROJECT_CATEGORIES,
} from '../../../assets/data/project-data';

@Component({
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
  public mode = signal<'create' | 'edit'>('create');
  public isSaving = signal(false); 
  public submitted = signal(false);

  private id: string | null = null;
  private readonly snackBarDuration = 5000;

  readonly statuses: SelectOption[] = PROJECT_STATUS;
  readonly categories: SelectOption[] = PROJECT_CATEGORIES;
  readonly languages: SelectOption[] = PROJECT_LANGUAGE;

  // inject dependencies
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly snackBar = inject(MatSnackBar);

  // create the project form
  projectForm = this.formBuilder.group({
    title: ['', Validators.required],
    status: ['', Validators.required],
    category: ['', Validators.required],
    programmingLanguage: ['', Validators.required],
    startDate: [null as Date | null, Validators.required],
    gitUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
    description: ['', Validators.required],
  });

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(
        first(),
        switchMap((paramMap: ParamMap) => {
          if (paramMap.has('id')) {
            this.mode.set('edit'); // use .set() for signals
            this.id = paramMap.get('id');
            return this.projectService.getProjectById(this.id!);
          } else {
            this.mode.set('create'); // use .set() for signals
            return of(undefined);
          }
        }),
      )
      .subscribe((project) => {
        if (project) {
          // set Date object for datepicker
          this.projectForm.patchValue({
            title: project.title ?? '',
            status: project.status ?? '',
            category: project.category ?? '',
            programmingLanguage: project.programmingLanguage ?? '',
            startDate: project.startDate ? new Date(project.startDate) : null,
            gitUrl: project.gitUrl ?? '',
            description: project.description ?? '',
          });
        }
      });
  }

  // saves a new project
  public onSaveProject(): void {
    this.submitted.set(true)
    if (!this.projectForm.valid) {
      // mark all controls touches to show errors
      Object.values(this.projectForm.controls).forEach((c) =>
        c.markAsTouched(),
      );
      return;
    }

    const formValue = this.projectForm.value as ProjectInput;
    this.isSaving.set(true);

    if (this.mode() === 'create') {
      this.projectService
        .addProject(formValue)
        .pipe(
          first(),
          finalize(() => this.isSaving.set(false)),
        )
        .subscribe({
          next: () => {
            this.snackBar.open('Project added.', 'Close', {
              duration: this.snackBarDuration,
            });
            this.router.navigateByUrl('/');
          },
          error: (error) => {
            console.error(error);
            this.snackBar.open('Error adding project.', 'Close', {
              duration: this.snackBarDuration,
            });
          },
        });
    } else {
      this.projectService
        .updateProjectById(this.id!, formValue)
        .pipe(
          first(),
          finalize(() => this.isSaving.set(false)),
        )
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
    const destination = this.mode() === 'edit' ? `/projects/${this.id}` : '/projects';
    this.router.navigateByUrl(destination);
  }
}
