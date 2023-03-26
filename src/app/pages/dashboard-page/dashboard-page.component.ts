import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardComponent {
	public opened = false;

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

	constructor(private breakpointObserver: BreakpointObserver) {}
}
