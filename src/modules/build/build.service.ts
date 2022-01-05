import { Injectable } from '@nestjs/common';
import { made_http_exception_obj } from 'src/utils/checkParam';
import { pwd, exec, find, cat, which, mv, cp, cd, ls, rm, exit } from 'shelljs';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { buildProjectPostDto } from './constant';
import { joinWhite, writeConf } from 'src/utils/fileOPrate';
import { execSync } from 'child_process';
@Injectable()
export class BuildService {
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
      const is_dev = process.env.NODE_ENV === 'development';
      if (!which('git')) {
        execSync('nvm use v14');
      }
      // 进入静态文件
      cd(pwd() + '/dist/static/build');
      mkdirSync('success');

      /**
       * 更新json文件及生成新的conf文件
       *
       */
      // 更新template文件夹目录下的端口json文件
      const data = readFileSync('template/constant.json', 'utf-8').split(
        /\r\n|\n|\r/gm,
      );
      data.splice(-3, 1, ...joinWhite({ project_name, type, port }));
      const writeData = data.join('\r\n');
      // 写入json文件
      writeFileSync('template/constant.json', writeData);
      // 生成要插入的数据
      const writeConfData = writeConf(JSON.parse(writeData).services);
      // 读取模版文件
      const confData = readFileSync('template/nginx.conf', 'utf-8').split(
        /\r\n|\n|\r/gm,
      );
      // 数据合并
      confData.splice(-2, 0, ...writeConfData);
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
      // 回到build
      cd('..');
      if (type === 'website') {
        // 移位文件并重启服务
        const project_to_path = is_dev
          ? 'success/web'
          : `/usr/local/${type}/${project_name}`;
        cp('-rf', 'template/web', project_to_path);
        cd(project_to_path);
        execSync(`git clone ${git_project_address}`);
        cd(git_project_name);
        execSync('npm i');
        exec('npm run build');
        mv('-f', './dist', '../');
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
        const project_to_path = is_dev ? 'success' : `usr/local/${type}`;
        cd(project_to_path);
        execSync(`git clone ${git_project_address}`);
        // 改名
        mv('-f', git_project_name, project_name);
        cd(project_name);
        execSync('npm i');
      }

      if (!is_dev) {
        // 加入后台服务
        execSync(`pm2 start bin/www --name=${project_name}`);
        // 重启nginx服务
        execSync('nginx -s reload');
      }
    } catch (error) {
      console.log(error.message, 'error');
    }
    return true;
  }
}
