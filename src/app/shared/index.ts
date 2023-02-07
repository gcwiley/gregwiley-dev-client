import { NgModule } from '@angular/core';

// shared components
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
// add new shared components here

@NgModule({
	declarations: [
		FooterComponent,
		HeaderComponent,
		HeroComponent,
		NavMenuComponent,
	],
	exports: [FooterComponent, HeaderComponent, HeroComponent, NavMenuComponent],
})
export class SharedComponents {}
