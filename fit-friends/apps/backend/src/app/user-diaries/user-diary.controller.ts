import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestWithTokenPayload, TokenPayload, UserRole } from '@fit-friends/shared-types';
import { Roles, RolesGuard, fillObject } from '@fit-friends/core';
import { UserDiaryService } from './user-diary.service';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';
import { FoodDiaryRdo } from './rdo/food-diary.rdo';
import { CreateFoodDiaryDto } from './dto/create-food-diary.dto';
import { CreateTrainingDiaryDto } from './dto/create-training-diary.dto';
import { TrainingDiaryRdo } from './rdo/training-diary.rdo';
import { UpdateFoodDiaryDto } from './dto/update-food-diary.dto';
import { ApiIndexQuery } from './query/user-diary.api-query.decorator';
import { UserDiaryQuery } from './query/user-diary.query';
import { UserDiaryType } from './user-diary.constant';

@ApiTags('user-diaries')
@Controller('user-diaries')
export class UserDiaryController {
  constructor(
    private readonly diaryService: UserDiaryService,
  ) { }

  @Post('/food')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'A resource for creating a diary entry', type: FoodDiaryRdo })
  public async createFoodDiary(@Req() { user }: RequestWithTokenPayload<TokenPayload>, @Body() dto: CreateFoodDiaryDto) {
    const newRecord = await this.diaryService.createFoodDiary(dto, user.sub);
    return fillObject(FoodDiaryRdo, newRecord);
  }

  @Post('/training')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'A resource for creating a diary entry', type: TrainingDiaryRdo })
  public async createTrainingDiary(@Req() { user }: RequestWithTokenPayload<TokenPayload>, @Body() dto: CreateTrainingDiaryDto) {
    const newRecord = await this.diaryService.createTrainingDiary(dto, user.sub);
    return fillObject(TrainingDiaryRdo, newRecord);
  }

  @Patch('/food/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @ApiParam({ name: "id", required: true, description: 'Diary record unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for editing diary information', type: FoodDiaryRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User diary not found' })
  public async updateFoodDiary(@Param('id') id: number, @Req() { user }: RequestWithTokenPayload<TokenPayload>, @Body() dto: UpdateFoodDiaryDto) {
    const updatedRecord = await this.diaryService.updateFoodDiary(dto, id, user.sub);
    return fillObject(FoodDiaryRdo, updatedRecord);
  }

  @Get('/food')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @ApiIndexQuery()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting a user food diary', type: [FoodDiaryRdo] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User diary not found', })
  async getFoodDiary(@Query() query: UserDiaryQuery) {
    const diary = await this.diaryService.getDiary(query, UserDiaryType.Food);
    return fillObject(FoodDiaryRdo, diary);
  }

  @Get('/training')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @ApiIndexQuery()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting a user training diary', type: [TrainingDiaryRdo] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User diary not found', })
  async getTrainingDiary(@Query() query: UserDiaryQuery) {
    const diary = await this.diaryService.getDiary(query, UserDiaryType.Training);
    return fillObject(TrainingDiaryRdo, diary);
  }

  @Delete('/food/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: "id", required: true, description: 'Diary record unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for deleting a diary record' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User diary not found', })
  async destroyFoodDiary(@Param('id') id: number, @Req() { user }: RequestWithTokenPayload<TokenPayload>, @Res() res: Response) {
    await this.diaryService.deleteDiary(id, user.sub, UserDiaryType.Food);
    return res.status(HttpStatus.OK).send();
  }

  @Delete('/training/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: "id", required: true, description: 'Diary record unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for deleting a diary record' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User diary not found', })
  async destroyTrainingDiary(@Param('id') id: number, @Req() { user }: RequestWithTokenPayload<TokenPayload>, @Res() res: Response) {
    await this.diaryService.deleteDiary(id, user.sub, UserDiaryType.Training);
    return res.status(HttpStatus.OK).send();
  }
}
