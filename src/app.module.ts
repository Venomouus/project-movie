/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MovieModule } from './app/movie/movie.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST','localhost'),
        port: Number(configService.get('DB_PORT', 5432)),
        username: configService.get('DB_USERNAME','postgres'),
        password: configService.get('DB_PASSWORD', '12345'),
        database: configService.get('DB_DATABASE', 'movieDb'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
      })

    }),
    MovieModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}