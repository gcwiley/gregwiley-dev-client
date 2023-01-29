import { NgModule } from '@angular/core';

// Pipes
import { SimpleTruncatePipe } from './simple-truncate.pipe';
import { TruncatePipe } from './truncate.pipe';

export { SimpleTruncatePipe, TruncatePipe };

const PIPES = [SimpleTruncatePipe, TruncatePipe];

@NgModule({
  exports: [PIPES],
  declarations: PIPES,
})
export class Pipes {}
