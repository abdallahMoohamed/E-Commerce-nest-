import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from './token.schema';
import { Model } from 'mongoose';

@Injectable()
export class TokendbService {
  constructor (@InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>) { }

  async create (object: any): Promise<TokenDocument> {
    return await this.tokenModel.create(object)
  }

  async find (object: any): Promise<TokenDocument[]> {
    return await this.tokenModel.find(object)
  }

}
