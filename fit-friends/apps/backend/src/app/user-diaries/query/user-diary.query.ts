import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { transformToMax, ValidityMessage as VM } from '@fit-friends/core';
import { UserDiaryQuery as UQ, UserDiarySort} from '../user-diary.constant';



export class UserDiaryQuery {
  @Transform(({ value }) => transformToMax(value, UQ.USER_DIARY_QUERY_MIN, UQ.USER_DIARY_QUERY_MAX))
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => +value)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  public page?: number = UQ.USER_DIARY_DEFAULT_PAGE;

  @IsEnum(UserDiarySort, { message: `${VM.IsEnumMessage} ${Object.values(UserDiarySort).join(', ')}` })
  @IsOptional()
  public sortType?: UserDiarySort = UserDiarySort.Date;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = UQ.USER_DIARY_DEFAULT_SORT_DIRECTION;

  @IsDateString()
  @IsOptional()
  public fromDate?: string;

  @IsDateString()
  @IsOptional()
  public beforeDate?: string;
}
