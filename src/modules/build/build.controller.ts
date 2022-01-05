import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { check_param } from 'src/utils/checkParam';
import { BuildService } from './build.service';
import { buildProjectPostDto } from './constant';

@ApiTags('项目部署')
@Roles('admin')
@Controller('build')
export class BuildController {
  constructor(private readonly buildService: BuildService) {}

  @Post('/project')
  fetchBuild(@Body() body: buildProjectPostDto) {
    check_param(body);
    return this.buildService.buildProject(body);
  }
}
