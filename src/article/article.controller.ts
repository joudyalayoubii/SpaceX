import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/article.dto';
import { UpdateArticleDto } from './dto/update.article.dto';
import { AuthGuard } from '../auth/guards/auth.guards';
import { RoleGuard } from '../auth/guards/role.guards';
import { Roles } from '../auth/roles.decorator' ;
import { ArticleState } from './article.entity';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}


 @Post()
@UseGuards(AuthGuard)
async createArticle(@Body() dto: CreateArticleDto, @Req() req) {
  const user = req.user;
  const isAdmin = user.role === 'admin';
  const userId = user.id ?? user.sub;
  console.log(' req.user:', req.user); 

  const article =await this.articleService.create({


 ...dto,
  state: isAdmin ? ArticleState.APPROVED : ArticleState.PENDING,
  adminId: isAdmin ? userId : null,
  userId: userId     // لو بدك ممكن تخلي userId = null لما الأدمن هو الناشر
});
  return article;
}

  
  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  
  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin')
  @Get('pending')
  findPending() {
    return this.articleService.findPending();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    return this.articleService.update(+id, dto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }


  @Patch(':id/accept')
@UseGuards(AuthGuard, RoleGuard) 
@Roles('admin')
async acceptArticle(@Param('id') id: number, @Req() req) {
  const admin = req.user;

  return this.articleService.approve(id, admin.id??admin.sub);
}

@Patch(':id/reject')
@UseGuards(AuthGuard, RoleGuard) 
@Roles('admin')
async rejectArticle(@Param('id') id: number, @Req() req) {
  const admin = req.user;

  return this.articleService.reject(id , admin.id??admin.sub);
}
}