import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './../user';
import { Comment } from './../comment';

@Entity({
  name: 'boards',
})
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  content: string;
  
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.boards, {})
  @JoinColumn({ name: 'userId' })
  user: User

  @OneToMany((type) => Comment, (comment) => comment.board, {
    onDelete: 'CASCADE'
  })
  comments: Comment[]  
}

export class BoardFillableFields {
  title: string;
  content: string;
  userId: number;
}
