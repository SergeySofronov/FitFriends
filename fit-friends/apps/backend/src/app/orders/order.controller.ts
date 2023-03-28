import { fillObject, JwtAuthGuard, Roles, RolesGuard } from '@fit-friends/core';
import { RequestWithTokenPayload, TokenPayload } from '@fit-friends/shared-types';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { OrderService } from './order.service';
import { ApiIndexQuery } from './query/order.api-query.decorator';
import { OrderQuery } from './query/order.query';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) { }

  @Post('/')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Coach}`)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Resource for user registration', type: OrderRdo })
  public async create(@Req() { user }: RequestWithTokenPayload<TokenPayload>, @Body() dto: CreateOrderDto) {
    const newOrder = await this.orderService.createOrder(dto, user.sub);
    return fillObject(OrderRdo, newOrder);
  }

  @Patch('/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Coach}`)
  @ApiParam({ name: "id", required: true, description: 'Order unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for editing order information', type: OrderRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Order not found' })
  public async update(@Param('id') id: number, @Req() { user }: RequestWithTokenPayload<TokenPayload>, @Body() dto: UpdateOrderDto) {
    const updatedOrder = await this.orderService.updateOrder(id, { ...dto, coachId: user.sub });
    return fillObject(OrderRdo, updatedOrder);
  }

  @Get('/')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Coach}`)
  @ApiIndexQuery()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting an array of ', type: OrderRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Orders not found', })
  async index(@Query() query: OrderQuery) {
    const users = await this.orderService.getOrders(query);
    return fillObject(OrderRdo, users);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: "id", required: true, description: 'Order unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting detailed information about certain order', type: OrderRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Order not found', })
  async show(@Param('id') id: number) {
    const user = await this.orderService.getOrder(id);
    return fillObject(OrderDetailedRdo, user);
  }
}
