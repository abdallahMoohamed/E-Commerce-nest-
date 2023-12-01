import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserdbService {
  constructor (@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async create (object: any): Promise<UserDocument> {
    return await this.userModel.create(object)
  }

  async findOne (object: any): Promise<UserDocument> {
    return await this.userModel.findOne(object)
  }

  async findOneAndUpdate (filter: any, update: any, option?: any): Promise<UserDocument> {
    return await this.userModel.findOneAndUpdate(filter, update, option)
  }

}
