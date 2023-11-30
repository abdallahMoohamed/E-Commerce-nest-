import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { JoivalidationPipe } from 'src/pipes/joivalidation/joivalidation.pipe';
import { activateAccountSchema, signUpSchema } from './user.joi';

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
  @Get('confirmEmail/:activationCode')
  @UsePipes(new JoivalidationPipe(activateAccountSchema))
  activateAccount (@Param() param: any) {
    return this._userService.activateAccount(param)
  }


  // login

  // reset password
}
