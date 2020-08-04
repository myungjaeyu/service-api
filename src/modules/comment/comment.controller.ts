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
import { CommentService, CreateCommentPayload, UpdateCommentPayload } from '.';

@Controller('api/comments')
@ApiTags('Comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async all(): Promise<any> {
    const comments = await this.commentService.all();
    return comments;
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async one(@Param('id') commentId: number): Promise<any> {
    const comment = await this.commentService.one(commentId);
    return comment;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())  
  @Post()
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() payload: CreateCommentPayload, @Request() request): Promise<any> {
    const _payload = Object.assign(payload, { userId: request.user.id });
    const comment = await this.commentService.create(_payload);
    return comment;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put('/:id')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async update(@Param('id') commentId: number, @Body() payload: UpdateCommentPayload, @Request() request): Promise<any> {
    const userId = request.user.id
    const comment = await this.commentService.update(userId, commentId, payload);
    return comment;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async remove(@Param('id') commentId: number, @Request() request): Promise<any> {
    const userId = request.user.id
    const comment = await this.commentService.remove(userId, commentId);
    return comment;
  }  
}