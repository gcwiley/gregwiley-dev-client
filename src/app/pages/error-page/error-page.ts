import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-error-page',
  templateUrl: './error-page.html',
  styleUrls: ['./error-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule],
})
export class ErrorPage {
  private router = inject(Router);

  public goHome(): void {
    this.router.navigateByUrl('/');
  }

  public goBack(): void {
    history.back();
  }

}
