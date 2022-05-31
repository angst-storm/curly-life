import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dictEnum' })
export class DictEnumPipe implements PipeTransform {
    public transform<TKey, TValue>(dict: { [Property in keyof TKey]: TValue }): Array<{ key: string, value: TValue }> {
        const res: Array<{ key: string, value: TValue }> = [];
        for (const key in dict) {
            res.push({ key: key, value: dict[key] });
        }

        return res;
    }
}
