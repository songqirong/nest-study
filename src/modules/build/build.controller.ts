import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { check_param } from 'src/utils/checkParam';
import { BuildService } from './build.service';
import { buildProjectPostDto, updateProjectDto } from './constant';

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

  @Patch('/update/:project')
  fetchUpdate(@Param() params: updateProjectDto) {
    return this.buildService.updateProject(params);
  }
}
