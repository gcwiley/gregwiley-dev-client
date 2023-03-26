import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardComponent {
	public opened = false;
}
