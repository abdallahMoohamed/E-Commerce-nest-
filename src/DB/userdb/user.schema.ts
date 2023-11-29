import { Schema, Prop, SchemaFactory, MongooseModule, raw } from "@nestjs/mongoose"

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, min: 5, max: 20 })
  userName: string

  @Prop({ required: true, unique: true, lowercase: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ enum: ['male', 'female'] })
  gender: string

  @Prop()
  phone: string

  @Prop({ enum: ['online', 'offline'], default: 'offline' })
  status: string

  @Prop({ enum: ['user', 'admin'], default: 'user' })
  role: string

  @Prop({ default: false })
  isConfirmed: boolean

  @Prop()
  forgetCode: string

  @Prop()
  activationCode: string

  @Prop(raw({
    publicId: { type: String },
    secureUrl: { type: String }
  }))
  profileImage: Record<string, any>;

  @Prop({
    type: [raw({
      publicId: { type: String },
      secureUrl: { type: String }
    })]
  })
  coverImages: Record<string, any>[];

}

// SchemaFactory
const userSchema = SchemaFactory.createForClass(User)
// Module
export const userDBModule = MongooseModule.forFeature([{
  name: User.name, schema: userSchema
}])