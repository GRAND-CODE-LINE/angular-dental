import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgoDetailed'
})
export class TimeAgoDetailedPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}