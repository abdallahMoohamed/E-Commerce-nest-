import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoivalidationPipe implements PipeTransform {
  constructor (private readonly schema: object) { }

  transform (value: any, metadata: ArgumentMetadata) {
    if (this.schema[metadata.type]) {
      const validationResult = this.schema[metadata.type].validate(value, {
        abort: false
      })

      if (validationResult.error)
        throw new BadRequestException(validationResult.error.details)
    }
    return value;
  }
}
