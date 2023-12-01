import { Body, Controller, Get, Param, Patch, Post, UsePipes, Req, Header } from '@nestjs/common';
import { UserService } from './user.service';
import { JoivalidationPipe } from 'src/pipes/joivalidation/joivalidation.pipe';
import { activateAccountSchema, forgetCodeSchema, loginSchema, resetPasswordSchema, signUpSchema } from './user.joi';
import { Request } from 'express'

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
  @Post('login')
  @UsePipes(new JoivalidationPipe(loginSchema))
  login (@Body() body: any, @Req() req: Request) {
    return this._userService.login(body, req)
  }

  // send forget code 
  @Patch('forgetCode')
  @UsePipes(new JoivalidationPipe(forgetCodeSchema))
  forgetCode (@Body() body: any) {
    return this._userService.sendForgetCode(body)
  }

  // reset password
  @Patch('resetPassword')
  @UsePipes(new JoivalidationPipe(resetPasswordSchema))
  resetPassword (@Body() body: any) {
    return this._userService.resetPassword(body)
  }

}
