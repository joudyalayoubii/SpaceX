import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './article.dto'; 
@Injectable()
export class ArticleService {
    constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async createArticle(
    createArticleDto: CreateArticleDto, 
    imageUrl?: string,
    videoUrl?: string,
  ){

    const {title , content , userId} = createArticleDto;
    const article = this.articleRepository.create({title , content , userId , imageUrl , videoUrl});
    return this.articleRepository.save(article);

  };

  async deleteArticle(){

  }

  async getApprovedArticles() {
  const articles = await this.articleRepository
    .createQueryBuilder('article')
    .where('article.isApproved = :isApproved', { isApproved: true }) 
    .getMany();
  return articles;
}






}
