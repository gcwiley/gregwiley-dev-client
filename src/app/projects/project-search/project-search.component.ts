import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

// import angulur material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

// import the project service
import { ProjectService } from '../../services/project.service';

// import the project interface
import { Project } from '../../types/project.interface';

@Component({
    selector: 'app-project-search',
    templateUrl: './project-search.component.html',
    styleUrls: ['./project-search.component.scss'],
    imports: [MatFormFieldModule, MatCardModule]
})
export class ProjectSearchComponent implements OnInit {
   projects$!: Observable<Project[]>;

   private searchTerms = new Subject<string>();

   constructor(private projectService: ProjectService) {}

   //  push a search term into the observable stream
   search(term: string): void {
      this.searchTerms.next(term);
   }

   ngOnInit(): void {
      this.projects$ = this.searchTerms.pipe(
         // wait 300ms after each keystroke before considering the term
         debounceTime(300),

         // ignore new term if same as previous term
         distinctUntilChanged(),

         // switch to new search observable each time the term changes
         switchMap((term: string) => this.projectService.searchProjects(term))
      );
   }
}
