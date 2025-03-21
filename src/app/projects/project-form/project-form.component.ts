import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
   FormBuilder,
   Validators,
   FormsModule,
   ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// import angular material modules
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
import {
   PROJECT_STATUS,
   PROJECT_LANGUAGE,
   PROJECT_CATAGORIES,
} from '../../../assets/data/project-data';

@Component({
   standalone: true,
   selector: 'app-project-form',
   templateUrl: './project-form.component.html',
   styleUrls: ['./project-form.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      CommonModule,
      FormsModule,
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
export class ProjectFormComponent implements OnInit {
   public mode = 'create';
   private id!: string;
   private project!: Project;

   statues: ProjectStatus[] = PROJECT_STATUS;
   categories: ProjectCategory[] = PROJECT_CATAGORIES;
   languages: ProjectLanguage[] = PROJECT_LANGUAGE;

   // create the project form
   projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      status: ['', Validators.required],
      category: ['', Validators.required],
      language: ['', Validators.required],
      startDate: ['', Validators.required],
      gitUrl: ['', Validators.required],
      description: ['', Validators.required],
   });

   constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      public route: ActivatedRoute,
      private projectService: ProjectService
   ) {}

   public ngOnInit(): void {
      // find out if we have an "id" or not
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
         if (paramMap.has('id')) {
            this.mode = 'edit';
            this.id = paramMap.get('id')!;
            this.projectService
               .getProjectById(this.id!)
               .subscribe((project) => {
                  this.project = project;
                  // overrides values of initial form controls
                  this.projectForm.setValue({
                     // set value for every form control
                     title: this.project.title,
                     status: this.project.status,
                     category: this.project.category,
                     language: this.project.language,
                     startDate: this.project.startDate,
                     gitUrl: this.project.gitUrl,
                     description: this.project.description,
                  });
               });
         } else {
            this.mode = 'create';
         }
      });
   }

   // save a new project
   public onSaveProject(): void {
      if (this.mode === 'create') {
         this.projectService
            .addProject(this.projectForm.value)
            .subscribe(() => {
               // navigates user back to homepage
               this.router.navigateByUrl('/');
            });
      } else {
         this.projectService
            .updateProjectById(this.id!, this.projectForm.value)
            .subscribe(() => {
               // navigates user back to homepage
               this.router.navigateByUrl('/');
            });
      }
   }

   // reset the form
   public onReset(event: Event): void {
      event.preventDefault();
      this.projectForm.reset();
   }
}
