import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// import the material module
import { MaterialModule } from '../material.module';

// import shared components
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { LogoComponent } from './logo/logo.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TopicListComponent } from './topic-list/topic-list.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
// add new shared components here

@NgModule({
	imports: [CommonModule, RouterModule, MaterialModule],
	declarations: [
		FooterComponent,
		HeaderComponent,
		HeroComponent,
		LogoComponent,
		NavMenuComponent,
		TopicListComponent,
  AdminHeaderComponent,
	],
	exports: [
		FooterComponent,
		HeaderComponent,
		HeroComponent,
		LogoComponent,
		NavMenuComponent,
		TopicListComponent,
	],
})
export class SharedComponentsModule {}
