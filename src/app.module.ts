import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule , ConfigService } from '@nestjs/config';
import { ArticleModule } from './article/article.module';


@Module({
  
   imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
   
       TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,


      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD, 
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    
    UserModule,
    AuthModule,
    ArticleModule,
  ],

  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
