import { Injectable, ConflictException } from '@nestjs/common';
import { UserdbService } from 'src/DB/userdb/userdb.service';
import * as bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class UserService {
  constructor (private readonly _userModel: UserdbService) { }

  async signUp (body: any) {
    // constructing data 
    const { userName, email, password } = body

    // check email existenece
    const user = await this._userModel.findOne({ email })
    if (user) throw new ConflictException('Email already exist')

    // hashed password 
    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALTPASSWORD))
    // create user 
    const newUser = await this._userModel.create({
      userName, email, password: hashedPassword
    })
    // return response 
    return { success: true, result: newUser }
  }

}
