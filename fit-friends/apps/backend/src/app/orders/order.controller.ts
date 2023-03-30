import { fillObject, Roles, RolesGuard } from '@fit-friends/core';
import { RequestWithTokenPayload, TokenPayload } from '@fit-friends/shared-types';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';
import { ApiIndexQuery } from './query/order.api-query.decorator';
import { OrderQuery } from './query/order.query';
import { OrderRdo } from './rdo/order.rdo';
import { PurchaseRdo } from './rdo/purchase.rdo';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) { }

  @Post('/')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Resource for user registration', type: OrderRdo })
  public async create(@Req() { user }: RequestWithTokenPayload<TokenPayload>, @Body() dto: CreateOrderDto) {
    const newOrder = await this.orderService.createOrder(dto, user.sub);
    return fillObject(OrderRdo, newOrder);
  }

  @Patch('/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @ApiParam({ name: "id", required: true, description: 'Order unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for editing order information', type: OrderRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Order not found' })
  public async update(@Param('id') id: number, @Req() { user }: RequestWithTokenPayload<TokenPayload>, @Body() dto: UpdateOrderDto) {
    const updatedOrder = await this.orderService.updateOrder(dto, id, user.sub);
    return fillObject(OrderRdo, updatedOrder);
  }

  @Get('/coach')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Coach}`)
  @ApiIndexQuery()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting an array of coach orders', type: OrderRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Orders not found', })
  async orders(@Query() query: OrderQuery, @Req() { user }: RequestWithTokenPayload<TokenPayload>) {
    const orders = await this.orderService.getOrders(query, user.sub);
    return fillObject(OrderRdo, orders);
  }

  @Get('/user')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @ApiIndexQuery()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting an array of user purchases', type: OrderRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Orders not found', })
  async purchases(@Query() query: OrderQuery, @Req() { user }: RequestWithTokenPayload<TokenPayload>) {
    console.log('user')
    const orders = await this.orderService.getPurchases(query, user.sub);
    return fillObject(PurchaseRdo, orders);
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Coach}`)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: "id", required: true, description: 'Order unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for deleting an order' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Orders not found', })
  async destroy(@Param('id') id: number, @Req() { user }: RequestWithTokenPayload<TokenPayload>, @Res() res: Response) {
    await this.orderService.deleteOrder(id, user.sub);
    return res.status(HttpStatus.OK).send();
  }
}
