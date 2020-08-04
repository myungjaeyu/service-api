import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './../user';
import { Board } from './../board';

@Entity({
  name: 'comments',
})
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  boardId: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.boards, {})
  @JoinColumn({ name: 'userId' })
  user: User

  @ManyToOne((type) => Board, (board) => board.comments, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'boardId' })
  board: Board

}

export class CommentFillableFields {
  content: string;
  userId: number;
  boardId: number;
}
