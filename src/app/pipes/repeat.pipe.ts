import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'repeat' })
export class RepeatPipe implements PipeTransform {
    public transform(value: number) : number[] {
        const res: number[] = [];
        for (let i: number = 0; i < value; i++) {
            res.push(i);
        }

        return res;
    }
}
