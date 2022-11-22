import { InputType, Field } from '@nestjs/graphql';
import { User } from '../models/user.model';

@InputType()
export class UpdateUserInput extends User {}
