import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from './article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/guards/auth.guards';
@Module({
  
  imports: [TypeOrmModule.forFeature([Article]),JwtModule],
  providers: [ArticleService,AuthGuard ],
  controllers: [ArticleController],
  exports:[AuthGuard]
})
export class ArticleModule {}
