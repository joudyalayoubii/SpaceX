// create-article.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  imageUrl?: string;

  @IsOptional()
  videoUrl?: string;
}
