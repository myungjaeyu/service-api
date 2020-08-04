import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Request,
  Param
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BoardService, CreateBoardPayload, UpdateBoardPayload } from './';

@Controller('api/boards')
@ApiTags('Board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService
  ) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async all(): Promise<any> {
    const boards = await this.boardService.all();
    return boards;
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async one(@Param('id') boardId: number): Promise<any> {
    const board = await this.boardService.one(boardId);
    return board;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())  
  @Post()
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() payload: CreateBoardPayload, @Request() request): Promise<any> {
    const _payload = Object.assign(payload, { userId: request.user.id });
    const board = await this.boardService.create(_payload);
    return board;
  }

  @Put('/:id')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async update(@Param('id') boardId: number, @Body() payload: UpdateBoardPayload, @Request() request): Promise<any> {
    const userId = request.user.id
    const board = await this.boardService.update(userId, boardId, payload);
    return board;
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async remove(@Param('id') boardId: number, @Request() request): Promise<any> {
    const userId = request.user.id
    const board = await this.boardService.remove(userId, boardId);
    return board;
  }  
}