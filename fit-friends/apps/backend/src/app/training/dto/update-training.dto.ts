import { PartialType } from "@nestjs/swagger";
import { CreateTrainingDto } from "./create-training.dto";

export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {
  public video?: string;
  public rating?: number;
  public coachId?: number;
  public reviewsCount?: number;
}
