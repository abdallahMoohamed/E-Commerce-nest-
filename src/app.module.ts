import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserdbService } from './DB/userdb/userdb.service';
import { TokendbService } from './DB/tokendb/tokendb.service';
import { MongooseModule } from '@nestjs/mongoose'
import * as dotenv from 'dotenv'
dotenv.config()
@Module({
  imports: [UserModule, MongooseModule.forRoot(`${process.env.DB_CONNECTION}/e_commerce`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
