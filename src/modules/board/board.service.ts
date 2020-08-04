import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Board, BoardFillableFields } from './board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly BoardRepository: Repository<Board>,
  ) {}

  async validateUserId(userId: number, id: number) {
    return await this.BoardRepository
      .createQueryBuilder('boards')
      .where('boards.userId = :userId and boards.id = :id')
      .setParameter('userId', userId)
      .setParameter('id', id)
      .getOne();
  }

  async all() {
    return this.BoardRepository.find();
  }

  async one(id: number) {
    return this.BoardRepository.findOne(id);
  }

  async create(payload: BoardFillableFields) {

    return await this.BoardRepository.save(payload);
  }

  async update(userId: number, id: number, payload: any) {

    const validate = await this.validateUserId(userId, id);

    if (!validate) {
      throw new NotAcceptableException(
        'You are not allowed to edit this board.',
      );
    }
    
    return await this.BoardRepository.update(id, payload)
  }

  async remove(userId: number, id: number) {

    const validate = await this.validateUserId(userId, id);

    if (!validate) {
      throw new NotAcceptableException(
        'You are not allowed to edit this board.',
      );
    }
  
    let boardToRemove = await this.BoardRepository.findOne(id);

    return boardToRemove && await this.BoardRepository.remove(boardToRemove);
  }  
}
