import { BadRequestException } from '@nestjs/common';

export class CustomExampleException extends BadRequestException {
  constructor() {
    super('This is custom example exception.');
  }
}
