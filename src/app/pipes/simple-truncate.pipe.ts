import { Pipe, PipeTransform } from '@angular/core';

// truncate pipe to limit the number of words displayed
@Pipe({ name: 'simpletruncate', standalone: true })
export class SimpleTruncatePipe implements PipeTransform {
  transform(value: string) {
    return value.split(' ').slice(0, 6).join(' ') + '...';
  }
}
