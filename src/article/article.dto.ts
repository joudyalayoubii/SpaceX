import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsInt()
  userId: number;

  @IsOptional()
  @IsString()
  imageUrl?: string; 

  @IsOptional()
  @IsString()
  videoUrl?: string; 
}
