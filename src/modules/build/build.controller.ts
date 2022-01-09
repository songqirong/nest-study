import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { check_param } from 'src/utils/checkParam';
import { BuildService } from './build.service';
import {
  buildProjectPostDto,
  deleteProjectDto,
  updateProjectDto,
} from './constant';

@ApiTags('项目部署')
@Roles('admin')
@Controller('build')
export class BuildController {
  constructor(private readonly buildService: BuildService) {}

  @Post('/project')
  fetchBuild(@Body() body: buildProjectPostDto) {
    const {
      project_name,
      ssl_url,
      git_project_address,
      git_project_name,
      type,
      port,
    } = body;
    check_param({
      project_name,
      git_project_address,
      git_project_name,
      ssl_url,
      port,
      type,
    });
    return this.buildService.buildProject(body);
  }

  @Patch('/update/:project')
  fetchUpdate(@Param() { project }: updateProjectDto) {
    return this.buildService.updateProject(project);
  }

  @Delete('/delete/:project')
  fetchDelete(@Param() { project }: deleteProjectDto) {
    return this.buildService.deleteProject(project);
  }
}
