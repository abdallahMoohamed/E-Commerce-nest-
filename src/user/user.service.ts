import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { UserdbService } from 'src/DB/userdb/userdb.service';
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import * as dotenv from 'dotenv'
import { EmailService } from 'src/email/email.service';
dotenv.config()

@Injectable()
export class UserService {
  constructor (
    private readonly _userModel: UserdbService,
    private readonly _emailService: EmailService
  ) { }

  async signUp (body: any) {
    // constructing data 
    const { userName, email, password } = body

    // check email existenece
    const user = await this._userModel.findOne({ email })
    if (user) throw new ConflictException('Email already exist')

    // hashed password 
    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALTPASSWORD))
    // generate activationCode
    const activationCode = crypto.randomBytes(64).toString('hex')
    // create user 
    const newUser = await this._userModel.create({
      userName, email, password: hashedPassword, activationCode
    })

    // create confirmationLink
    const link = `http://localhost:${process.env.PORT}/auth/confirmEmail/${activationCode}`
    //send email
    const isSent = await this._emailService.sendEmail(email, "activate account", `Confirm Email with link :${link}`);
    // return response 
    if (!isSent) throw new HttpException('In-valid Email', 500)
    return { success: true, message: "Review your email" }
  }

}
