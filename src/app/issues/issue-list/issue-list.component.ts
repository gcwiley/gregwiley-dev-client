import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// import angualr material modules
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';

// import the issue service
import { IssueService } from 'src/app/services/issue.service';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatTableModule],
})
export class IssueListComponent implements OnInit {
  // columns to display
  columnsToDisplay = ['title', 'category', 'status'];

  isLoadingResults = true;

  // set the data source
  dataSource = new MatTableDataSource();

  constructor(private issueService: IssueService, private router: Router) {}

  ngOnInit(): void {
    this.getIssues();
  }

  getIssues(): void {
    this.issueService.getIssues().subscribe((issues) => {
      this.dataSource.data = issues;
    });
  }

  onDeleteIssue(id: string) {
    this.issueService.deleteIssue(id).subscribe(() => {
      // navigates admin user back to the issues page
      this.router.navigateByUrl('/support');
    });
  }
}
