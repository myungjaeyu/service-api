import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PasswordTransformer } from './password.transformer';
import { Board } from './../board';
import { Comment } from './../comment';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column({ length: 255 })
  email: string;

  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
  })
  @Exclude()
  password: string;

  @OneToMany((type) => Board, (board) => board.user, {})
  boards: Board[]

  @OneToMany((type) => Comment, (comment) => comment.user, {})
  comments: Comment[]
}

export class UserFillableFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
