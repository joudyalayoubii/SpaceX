import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article, ArticleState } from './article.entity';
import { CreateArticleDto } from './dto/article.dto';
import { UpdateArticleDto } from './dto/update.article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,
  ) {}

   async create(data: Partial<Article>) {
    const article = this.articleRepo.create(data);
    console.log('User in request:', data);
    return this.articleRepo.save(article);
   }

  findAll() {
    return this.articleRepo.find();
  }

  findPending() {
    return this.articleRepo.find({ where: { state: ArticleState.PENDING } });
  }

  async findOne(id: number) {
    const article = await this.articleRepo.findOneBy({ id });
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return article;
  }

  async update(id: number, dto: UpdateArticleDto) {
    const article = await this.findOne(id);
    Object.assign(article, dto);
    return this.articleRepo.save(article);
  }

  async remove(id: number) {
    const article = await this.findOne(id);
    return this.articleRepo.remove(article);
  }

 
async approve(articleId: number, adminId: number) {
  const article = await this.articleRepo.findOneBy({ id: articleId });

  if (!article || article.state !== 'pending') {
    throw new BadRequestException('Invalid or already accepted article.');
  }

  article.state = ArticleState.APPROVED;
  article.adminId = adminId;

  return this.articleRepo.save(article);
}


async reject(articleId: number, adminId: number) {
  const article = await this.articleRepo.findOneBy({ id: articleId });

  if (!article || article.state !== 'pending') {
    throw new BadRequestException('Invalid or already accepted article.');
  }

  article.state = ArticleState.REJECTED;
  article.adminId = adminId;
   return this.articleRepo.save(article);

}

  
}
