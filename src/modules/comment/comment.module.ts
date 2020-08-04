import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CommentController],
  exports: [CommentService],
  providers: [CommentService],
})
export class CommentModule {}
