import { Pipe, PipeTransform } from '@angular/core';

// truncate pipe to limit the number of words displayed
@Pipe({ name: 'truncate' })
export class SimpleTruncatePipe implements PipeTransform {
  transform(value: string) {
    return value.split(' ').slice(0, 2).join(' ') + '...';
  }
}
