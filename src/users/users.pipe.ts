import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';

@Injectable()
export class UsersPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log("Validation is working");

    const parseIntAge = parseInt(value?.age?.toString());

    if (isNaN(parseIntAge)) {
      console.log(`${value?.age} is not a number`);
      throw new HttpException("Age is not a number", HttpStatus?.BAD_REQUEST);
    }

    return {
      ...value, age: parseIntAge
    }
  }
}
