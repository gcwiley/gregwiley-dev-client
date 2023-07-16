import { Component } from '@angular/core';

// import angulur material
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule],
})
export class ProjectSearchComponent {}
