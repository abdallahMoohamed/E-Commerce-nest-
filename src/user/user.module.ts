import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userDBModule } from 'src/DB/userdb/user.schema';
import { UserdbService } from 'src/DB/userdb/userdb.service';
import { TokendbService } from 'src/DB/tokendb/tokendb.service';
import { tokenDBModule } from 'src/DB/tokendb/token.schema';


@Module({
  imports: [userDBModule,tokenDBModule],
  providers: [UserService, UserdbService, TokendbService],
  controllers: [UserController]
})
export class UserModule { }
