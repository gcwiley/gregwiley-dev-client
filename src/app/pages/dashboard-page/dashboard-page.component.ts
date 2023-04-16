import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardComponent {
	public opened = false;

	constructor(
		private breakpointObserver: BreakpointObserver,
		private router: Router,
		public auth: AngularFireAuth
	) {}

	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(
			map((result) => result.matches),
			shareReplay()
		);

	isSmall$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Small)
		.pipe(
			map((result) => result.matches),
			shareReplay()
		);

	onClickSignOut(): void {
		this.auth.signOut().then(() => this.router.navigateByUrl('/signin'));
	}
}
