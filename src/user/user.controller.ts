import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { JoivalidationPipe } from 'src/pipes/joivalidation/joivalidation.pipe';
import { signUpSchema } from './user.joi';

@Controller('user')
export class UserController {
  constructor (private readonly _userService: UserService) { }

  // signUp
  @Post('signUp')
  @UsePipes(new JoivalidationPipe(signUpSchema))
  signUp (@Body() body: any) {
    return this._userService.signUp(body)
  }

  // activate Account

  

  // login

  // reset password
}
