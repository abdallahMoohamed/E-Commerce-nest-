import { Schema, Prop, SchemaFactory, MongooseModule } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";


// class
@Schema({ timestamps: true })
export class Token {
  @Prop({ required: true })
  token: string

  @Prop({ ref: 'User' })
  user: Types.ObjectId

  @Prop({ default: true })
  isValid: boolean

  @Prop()
  agent: string

  @Prop()
  expiredAt: string
}

export type TokenDocument = Token & Document

// SchemaFactory
const tokenSchema = SchemaFactory.createForClass(Token)
// Module
export const tokenDBModule = MongooseModule.forFeature([{
  name: Token.name, schema: tokenSchema
}])