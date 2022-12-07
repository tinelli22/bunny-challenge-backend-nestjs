import { Injectable } from '@nestjs/common';
import { CreditcardPostInput } from '../dto/creditcardPost.input';

@Injectable()
export class CreditcardService {
    async create(data: CreditcardPostInput) {
        
    }
}
