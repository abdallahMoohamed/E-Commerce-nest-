import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './token.schema';
import { Model } from 'mongoose';

@Injectable()
export class TokendbService {
  constructor (@InjectModel(Token.name) private readonly tokenModel: Model<Token>) { }

  async create (object: any): Promise<Token> {
    return await this.tokenModel.create(object)
  }
  
}
