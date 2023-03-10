import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import material module
import { MaterialModule } from '../material.module';

// import shared components
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
// add new shared components here

@NgModule({
	imports: [CommonModule, MaterialModule],
	declarations: [
		FooterComponent,
		HeaderComponent,
		HeroComponent,
		NavMenuComponent,
	],
	exports: [FooterComponent, HeaderComponent, HeroComponent, NavMenuComponent],
})
export class SharedComponentsModule {}
