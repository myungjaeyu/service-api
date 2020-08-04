import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [BoardController],
  exports: [BoardService],
  providers: [BoardService],
})
export class BoardModule {}
