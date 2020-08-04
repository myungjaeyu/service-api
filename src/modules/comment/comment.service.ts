import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment, CommentFillableFields } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly CommentRepository: Repository<Comment>,
  ) {}

  async validateUserId(userId: number, id: number) {
    return await this.CommentRepository
      .createQueryBuilder('comments')
      .where('comments.userId = :userId and comments.id = :id')
      .setParameter('userId', userId)
      .setParameter('id', id)
      .getOne();
  }

  async all() {
    return this.CommentRepository.find();
  }

  async one(id: number) {
    return this.CommentRepository.findOne(id);
  }

  async create(payload: CommentFillableFields) {

    return await this.CommentRepository.save(payload);
  }

  async update(userId: number, id: number, payload: any) {

    const validate = await this.validateUserId(userId, id);

    if (!validate) {
      throw new NotAcceptableException(
        'You are not allowed to edit this comment.',
      );
    }

    return await this.CommentRepository.update(id, payload)
  }

  async remove(userId: number, id: number) {

    const validate = await this.validateUserId(userId, id);

    if (!validate) {
      throw new NotAcceptableException(
        'You are not allowed to delete this comment.',
      );
    }
  
    let commentToRemove = await this.CommentRepository.findOne(id);

    return commentToRemove && await this.CommentRepository.remove(commentToRemove);
  }  
}
