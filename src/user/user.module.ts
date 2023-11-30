import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userDBModule } from 'src/DB/userdb/user.schema';
import { UserdbService } from 'src/DB/userdb/userdb.service';
import { TokendbService } from 'src/DB/tokendb/tokendb.service';
import { tokenDBModule } from 'src/DB/tokendb/token.schema';
import { EmailService } from 'src/email/email.service';


@Module({
  imports: [userDBModule, tokenDBModule],
  controllers: [UserController],
  providers: [UserService, UserdbService, TokendbService, EmailService]
})
export class UserModule { }
