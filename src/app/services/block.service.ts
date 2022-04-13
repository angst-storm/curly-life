import { Injectable } from '@angular/core';
import { Block } from '../models/block.model';

@Injectable()
export class BlockService {
    public blocks: Block[] = [
        new Block('Обязательные расходы', 50, 17500),
        new Block('Необязательные расходы', 40, 14000),
        new Block('Накопления', 10, 3500)
    ];
}
