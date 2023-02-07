import { NgModule } from '@angular/core';

// Pipes
import { SimpleTruncatePipe } from './simple-truncate.pipe';
import { TruncatePipe } from './truncate.pipe';
// Note: Add new pipes here

@NgModule({
	declarations: [SimpleTruncatePipe, TruncatePipe],
	exports: [SimpleTruncatePipe, TruncatePipe],
})
export class Pipes {}
