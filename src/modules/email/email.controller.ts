import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { check_param } from 'src/utils/checkParam';
import { EmailPost } from './classes/email';
import { EmailService } from './email.service';

@ApiTags('邮件服务')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Server is not found' })
  @ApiBody({ type: EmailPost })
  @Post()
  sendEmail(@Body() data: EmailPost): string {
    check_param({ email: data.email });
    return this.emailService.sendEmail(data);
  }
}
