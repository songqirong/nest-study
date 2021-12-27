import { Injectable } from '@nestjs/common';

@Injectable()
export class GuardService {
  fetch(id): string {
    return `Hello World! ${id}`;
  }
}
