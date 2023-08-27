import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgoDetailed'
})
export class TimeAgoDetailedPipe implements PipeTransform {
  transform(value?: Date): string {
    if (value == undefined) {
      return '';
    }
    value = new Date(value)
    const currentTime = new Date();
    const diffInSeconds = Math.floor((currentTime.getTime() - value.getTime()) / 1000);
    const intervals: any = {
      año: 31536000,
      mes: 2592000,
      día: 86400,
      hora: 3600,
      minuto: 60,
      segundo: 1
    };

    let timeAgo = '';

    for (const interval in intervals) {
      const intervalInSeconds = intervals[interval];
      const count = Math.floor(diffInSeconds / intervalInSeconds);

      if (count > 0) {
        if (count === 1) {
          timeAgo = `hace ${count} ${interval}`;
        } else {
          timeAgo = `hace ${count} ${interval}s`;
        }
        break;
      }else{
        timeAgo = 'hace unos momentos'
      }
    }

    return timeAgo;
  }
}
