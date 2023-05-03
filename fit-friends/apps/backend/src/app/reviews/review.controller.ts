import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Roles, RolesGuard, fillObject } from '@fit-friends/core';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestWithTokenPayload, TokenPayload, UserRole } from '@fit-friends/shared-types';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';
import { ReviewRdo } from './rdo/review.rdo';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiIndexQuery } from './query/review.api-query.decorator';
import { ReviewQuery } from './query/review.query';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewService: ReviewService,
  ) { }

  @Post('/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @HttpCode(HttpStatus.CREATED)
  @ApiParam({ name: "id", required: true, description: 'Training unique identifier' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Resource for creating reviews about a workout', type: ReviewRdo })
  public async create(@Param('id') id: number, @Body() dto: CreateReviewDto, @Req() { user }: RequestWithTokenPayload<TokenPayload>) {
    const newReview = await this.reviewService.createReview(dto, id, user.sub);
    return fillObject(ReviewRdo, newReview);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiIndexQuery()
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id", required: true, description: 'Training unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'A resource for getting reviews about a workout', type: [ReviewRdo] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Reviews not found', })
  async index(@Query() query: ReviewQuery, @Param('id') id: number) {
    const users = await this.reviewService.getReviews(query, id);
    return fillObject(ReviewRdo, users);
  }
}
