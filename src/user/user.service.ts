import { Injectable, ConflictException, HttpException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserdbService } from 'src/DB/userdb/userdb.service';
import * as bcrypt from 'bcrypt'
import * as randomstring from 'randomstring'
import * as crypto from 'crypto'
import * as dotenv from 'dotenv'
import { JwtService } from '@nestjs/jwt'
import { EmailService } from 'src/email/email.service';
import { TokendbService } from 'src/DB/tokendb/tokendb.service';
import { Request } from 'express';

dotenv.config()

@Injectable()
export class UserService {
  constructor (
    private readonly _userModel: UserdbService,
    private readonly _tokenModel: TokendbService,
    private readonly _emailService: EmailService,
    private readonly _jwtService: JwtService
  ) { }

  async signUp (body: any): Promise<object> {
    // constructing data 
    const { userName, email, password } = body

    // check email existenece
    const user = await this._userModel.findOne({ email })
    if (user) throw new ConflictException('Email already exist')

    // hashed password 
    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND))
    // generate activationCode
    const activationCode = crypto.randomBytes(64).toString('hex')
    // create user 
    const newUser = await this._userModel.create({
      userName, email, password: hashedPassword, activationCode
    })

    // create confirmationLink
    const link = `http://localhost:${process.env.PORT}/user/confirmEmail/${activationCode}`
    //send email
    const isSent = await this._emailService.sendEmail(email, "activate account", `Confirm Email with link :${link}`);
    // return response 
    if (!isSent) throw new HttpException('In-valid Email', 500)
    return { success: true, message: "Review your email" }
  }

  async activateAccount (params: any): Promise<object> {
    //find and update user 
    const user = await this._userModel.findOneAndUpdate(
      { activationCode: params.activationCode },
      { isConfirmed: true, $unset: { activationCode: 1 } }
    )
    if (!user) throw new NotFoundException('User not found ')
    //create a cart TODO
    // return response 
    return { success: true, message: 'Your account is now activated!' }
  }

  async login (body: any, req: Request): Promise<object> {
    // construct the data
    const { email, password } = body
    // check exitence
    const user = await this._userModel.findOne({ email })
    if (!user) throw new NotFoundException('User not found')
    // check isConfrimed 
    if (!user.isConfirmed) throw new BadRequestException("Un-activated account")
    // compare password 
    const match = bcrypt.compareSync(password, user.password)
    if (!match) throw new BadRequestException("In-valid password")
    // genertate token 
    const token = this._jwtService.sign(
      { id: user['id'], email: user.email },
      { secret: process.env.TOKEN_KEY, expiresIn: '2d' }
    )
    // save token in db
    await this._tokenModel.create({
      token,
      user: user['id'],
      isValid: true,
      agent: req.headers['user-agent']
    })
    // change state to online and save user 
    user.status = 'online'
    await user.save()
    // return response 
    return { success: true, results: token }
  }

  async sendForgetCode (body: any): Promise<object> {
    // construct data
    const { email } = body
    // check exitence
    const user = await this._userModel.findOne({ email })
    if (!user) throw new NotFoundException('User not found')
    // generate code 
    const code = randomstring.generate({
      length: 9,
      charset: 'numeric'
    })
    // update user 
    user.forgetCode = code
    await user.save()
    // send email
    const isSent = await this._emailService.sendEmail(email, "Reset Password", `The code: ${code}`)
    if (!isSent) throw new HttpException('Somthing Wrong', 500);

    return { success: true, message: 'Check your email' }
  }

  async resetPassword (body: any): Promise<object> {
    // construct data
    const { code, password } = body
    // find user and delete forgetCode
    const user = await this._userModel.findOneAndUpdate(
      { forgetCode: code }, { $unset: { forgetCode: 1 } }
    )
    if (!user) throw new NotFoundException('In-valid code')

    // update password
    user.password = bcrypt.hashSync(password, Number(process.env.SALT_ROUND))
    await user.save()

    // Invalidate tokens
    const userId = JSON.parse(JSON.stringify(user._id)) /* handle user._id */
    const tokens = await this._tokenModel.find({ user: userId })
    tokens.forEach(async (token) => {
      token.isValid = false
      await token.save()
    })

    return { success: true, message: "Try to login again!" }
  }
}
