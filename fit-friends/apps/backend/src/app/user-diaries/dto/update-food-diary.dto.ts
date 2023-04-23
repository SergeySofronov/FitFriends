import { PartialType } from '@nestjs/swagger';
import { CreateFoodDiaryDto } from './create-food-diary.dto';

export class UpdateFoodDiaryDto extends PartialType(CreateFoodDiaryDto) { }
