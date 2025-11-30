import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { RouterModule, Router } from '@angular/router';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.html',
  styleUrls: ['./error-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, MatButtonModule, MatCardModule],
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
