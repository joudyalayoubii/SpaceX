import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum ArticleState {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PENDING = 'pending',
}

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: ArticleState,
    default: ArticleState.PENDING,
  })
  state: ArticleState;

   @Column()
  userId: number; 

  @Column({ nullable: true })
  adminId: number;


  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  videoUrl: string;
}
