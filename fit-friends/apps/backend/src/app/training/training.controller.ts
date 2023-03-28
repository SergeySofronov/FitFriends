import { fillObject, getMulterOptions, JwtAuthGuard, Roles, RolesGuard } from '@fit-friends/core';
import { RequestWithTokenPayload, TokenPayload, UserRole } from '@fit-friends/shared-types';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrainingService } from './training.service';
import { ApiIndexQuery } from './query/training.api-query.decorator';
import { TrainingQuery } from './query/training.query';
import { CreateTrainingDto } from './dto/create-training.dto';
import { TrainingRdo } from './rdo/training.rdo';
import { UpdateTrainingDto } from './dto/update-training.dto';

@ApiTags('training')
@Controller('training')
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
  ) { }

  @Post('/')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Coach}`)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Resource for user registration', type: TrainingRdo })
  public async create(@Req() { user }: RequestWithTokenPayload<TokenPayload>, @Body() dto: CreateTrainingDto) {
    const newTraining = await this.trainingService.createTraining(dto, user.sub);
    return fillObject(TrainingRdo, newTraining);
  }

  @Patch('/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Coach}`)
  @ApiParam({ name: "id", required: true, description: 'Training unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for editing training information', type: TrainingRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Training not found' })
  public async update(@Param('id') id: number, @Req() { user }: RequestWithTokenPayload<TokenPayload>, @Body() dto: UpdateTrainingDto) {
    const updatedTraining = await this.trainingService.updateTraining(id, { ...dto, coachId: user.sub });
    return fillObject(TrainingRdo, updatedTraining);
  }

  @Post('/:id/video')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Coach}`)
  @UseInterceptors(FileInterceptor('video', getMulterOptions()))
  @ApiParam({ name: "id", required: true, description: 'Training unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for uploading training video', type: TrainingRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Training not found' })
  public async uploadVideo(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
    const updatedUser = this.trainingService.updateTrainingVideo(id, file.filename);
    return fillObject(TrainingRdo, updatedUser);
  }

  @Get('/:id/video')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Coach}`)
  @ApiParam({ name: "id", required: true, description: 'Training unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting user avatar', type: TrainingRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Training not found' })
  public async readVideo(@Param('id') id: number, @Req() { user }: RequestWithTokenPayload<TokenPayload>, @Res() res: Response) {
    const videoPath = await this.trainingService.getTrainingVideoPath(id, user.sub);
    return res.sendFile(videoPath);
  }

  @Get('/')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Coach}`)
  @ApiIndexQuery()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting an array of trainings', type: TrainingRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Trainings not found', })
  async index(@Query() query: TrainingQuery) {
    const users = await this.trainingService.getTrainings(query);
    return fillObject(TrainingRdo, users);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: "id", required: true, description: 'Training unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting detailed information about certain training', type: TrainingRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Training not found', })
  async show(@Param('id') id: number) {
    const user = await this.trainingService.getTrainingById(id);
    return fillObject(TrainingRdo, user);
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Coach}`)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: "id", required: true, description: 'Training unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for deleting a training' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Training not found', })
  async destroy(@Param('id') id: number, @Req() { user }: RequestWithTokenPayload<TokenPayload>, @Res() res: Response) {
    await this.trainingService.deleteTraining(id, user.sub);
    return res.status(HttpStatus.OK).send();
  }
}
