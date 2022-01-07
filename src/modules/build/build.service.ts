import { Injectable } from '@nestjs/common';
import { made_http_exception_obj } from 'src/utils/checkParam';
import { exec, which, mv, cp, cd, ls, rm, find } from 'shelljs';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { buildProjectPostDto, services, updateProjectDto } from './constant';
import { joinWhite, writeConf } from 'src/utils/fileOprate';
import { execSync } from 'child_process';
import { join } from 'path';
const is_dev = process.env.CURRENT_ENV === 'development';
@Injectable()
export class BuildService {
  dist_path: any;
  constructor() {
    // 存储dist路径
    this.dist_path = join(__dirname, '../..');
  }
  buildProject(body: buildProjectPostDto) {
    const {
      ssl_url,
      project_name,
      type,
      port,
      git_project_address,
      git_project_name,
    } = body;
    try {
      if (!which('git')) {
        execSync('nvm use v16');
      }
      // 进入静态文件
      cd(`${this.dist_path}/static/build`);
      if (find('success').stderr !== null) {
        mkdirSync('success');
      }

      /**
       * 拉取文件代码
       */
      if (type === 'website') {
        // 移位文件并重启服务
        const project_to_path = is_dev
          ? `success/${project_name}`
          : `/usr/local/${type}/${project_name}`;
        cp('-rf', 'template/web', project_to_path);
        cd(project_to_path);
        execSync(`git clone ${git_project_address}`);
        cd(git_project_name);
        execSync('npm i');
        execSync('npm run build');
        mv('-f', 'dist', '../dist');
        cd('..');
        rm('-rf', git_project_name);
        // 更改端口号
        const wwwData = readFileSync('bin/www', 'utf-8').split(/\r\n|\n|\r/gm);
        wwwData.splice(
          14,
          1,
          `var port = normalizePort(process.env.PORT || ${port});`,
        );
        writeFileSync('bin/www', wwwData.join('\r\n'));
        execSync('npm i');
      } else {
        const project_to_path = is_dev ? 'success' : `/usr/local/${type}`;
        cd(project_to_path);
        execSync(`git clone ${git_project_address}`);
        // 改名
        mv('-f', git_project_name, project_name);
        cd(project_name);
        execSync('npm i');
      }
      // 回到build
      cd(`${this.dist_path}/static/build`);
      /**
       * 更新json文件及生成新的conf文件
       *
       */
      // 更新template文件夹目录下的端口json文件
      const template_json_path = `template/${
        is_dev ? 'local.constant.json' : 'constant.json'
      }`;
      const data = readFileSync(template_json_path, 'utf-8').split(
        /\r\n|\n|\r/gm,
      );
      data.splice(
        -3,
        1,
        ...joinWhite({
          project_name,
          type,
          git_project_address,
          git_project_name,
          ssl_url,
          port,
        }),
      );
      const writeData = data.join('\r\n');
      // 写入json文件
      writeFileSync(template_json_path, writeData);
      // 生成要插入的数据
      const writeConfData = writeConf(JSON.parse(writeData).services);
      // 读取模版文件
      const confData = readFileSync('template/nginx.conf', 'utf-8').split(
        /\r\n|\n|\r/gm,
      );
      // 数据合并
      confData.splice(-1, 0, ...writeConfData);
      // 输出文件
      writeFileSync(
        is_dev ? 'success/nginx.conf' : '/etc/nginx/nginx.conf',
        confData.join('\r\n'),
      );

      /**
       * ssl证书处理
       */
      const filename = ssl_url.split('/ssl/')[1];
      // 复制ssl证书压缩包到指定位置
      cp(`ssl/${filename}`, 'success');
      // 回到static目录
      cd('success');
      // 解压
      exec(`unzip -o ${filename}`);
      // 删除zip文件
      rm(filename);
      // 重命名
      ls(['*.pem', '*.key']).forEach((file) => {
        mv(
          '-f',
          file,
          `${is_dev ? '' : '/etc/pki/nginx/'}${project_name}.${
            file.indexOf('pem') !== -1 ? 'pem' : 'key'
          }`,
        );
      });
      rm('-rf', 'static/build/success');

      if (!is_dev) {
        // 防止pm2启动失败
        cd('/');
        // 加入后台服务
        execSync(
          `pm2 start /usr/local/${type}/${project_name}/bin/www --name=${project_name}`,
        );
        // 重启nginx服务
        execSync('nginx -s reload');
        // 重启nest
        execSync('pm2 reload nest');
      }
    } catch (error) {
      // 代码拉取失败后删除创建的文件项目
      rm(
        '-rf',
        is_dev
          ? `${this.dist_path}/static/build/success/${project_name}`
          : `/usr/local/${type}/${project_name}`,
      );
      rm('-rf', `${this.dist_path}/static/build/success`);
      made_http_exception_obj(error.message, error.code || 'git forbidden');
    }
    return true;
  }

  updateProject(params: updateProjectDto) {
    try {
      if (!which('git')) {
        execSync('nvm use v16');
      }
      const { project } = params;
      const data = services.filter((item) => item.project_name === project)[0];
      const project_path = is_dev
        ? `${this.dist_path}/static/build/success`
        : `/usr/local/${data.type}`;
      cd(project_path);
      if (data.type === 'api') {
        // 保留静态文件
        const resource_path =
            data.project_name === 'nest' ? 'dist/static' : 'public',
          static_mv_path = `${data.project_name}/${resource_path}`;
        mv('-f', static_mv_path, 'public');
        rm('-rf', data.project_name);
        execSync(`git clone ${data.git_project_address}`);
        // 改名
        mv('-f', data.git_project_name, data.project_name);
        cd(data.project_name);
        execSync('npm i');
        data.project_name === 'nest' && execSync('npm run build');
        cd('..');
        // 移入静态文件;
        mv('-f', 'public', static_mv_path);
      } else {
        cd(data.project_name);
        rm('-rf', 'dist');
        execSync(`git clone ${data.git_project_address}`);
        cd(data.git_project_name);
        execSync('npm i');
        execSync('npm run build');
        mv('-f', 'dist', '../dist');
        cd('..');
        rm('-rf', data.git_project_name);
      }
      if (!is_dev) {
        cd('/');
        execSync(`pm2 reload ${data.project_name}`);
      }
    } catch (error) {
      console.log(error, 'error');
      made_http_exception_obj(error.message, error.code || 'git forbidden');
    }
  }
}
