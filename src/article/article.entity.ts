import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default:'pending' })
  state:['approved' , 'rejected' , 'pending']; 

  @Column()
  userId: number; 

  @Column({ nullable: true })
  imageUrl: string; 

  @Column({ nullable: true })
  videoUrl: string; 
}
