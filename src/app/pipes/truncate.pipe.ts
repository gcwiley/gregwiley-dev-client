import { Pipe, PipeTransform } from '@angular/core';

// truncate pipe to limit the number of words displayed
// and add a symbol to the end of the truncated text
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, length: number, symbol: string) {
    return value.split(' ').slice(0, length).join(' ') + symbol;
  }
}
