import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserdbService {
  constructor (@InjectModel(User.name) private readonly userModel: Model<User>) { }

  async create (object: any): Promise<User> {
    return await this.userModel.create(object)
  }

  async findOne (object: any): Promise<User> {
    return await this.userModel.findOne(object)
  }
}
