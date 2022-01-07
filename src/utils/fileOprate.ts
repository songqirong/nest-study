import { IService } from 'src/modules/build/constant';

/**
 * 写入json文件
 * @param obj json文件对象
 * @returns
 */
export const joinWhite = (obj: IService) => {
  const arr = [];
  arr.push('    },', '    {');
  for (const key in obj) {
    const val = key === 'port' ? obj[key] : `"${obj[key]}",`;
    arr.push(`     "${key}": ${val}`);
  }
  arr.push('    }');
  return arr;
};

export const writeConf = (jsonArray: IService[]) => {
  const arr = [];
  jsonArray.map((item) => {
    // 80 http redirect
    arr.push('  server {');
    arr.push('    listen       80;');
    arr.push('    listen       [::]:80;');
    arr.push(`    server_name  ${item.project_name}.persion.cn;`);
    arr.push(
      `    rewrite ^/(.*)$ https://${item.project_name}.persion.cn:443/$1 permanent;`,
    );
    arr.push('  }');
    // 443 https
    arr.push('  server {');
    arr.push('    listen       443 ssl;');
    arr.push('    listen       [::]:443 ssl;');
    arr.push(`    server_name  ${item.project_name}.persion.cn;`);
    // 根路径
    arr.push(
      `    root         /usr/local/${item.type}/${item.project_name}/${
        item.type === 'api' || item.project_name === 'nest' ? 'public' : 'dist'
      };`,
    );
    // ssl证书配置
    arr.push(`    ssl_certificate "/etc/pki/nginx/${item.project_name}.pem";`);
    arr.push(
      `    ssl_certificate_key "/etc/pki/nginx/${item.project_name}.key";`,
    );
    arr.push('    ssl_session_cache shared:SSL:1m;');
    arr.push('    ssl_session_timeout  10m;');
    arr.push('    ssl_ciphers HIGH:!aNULL:!MD5;');
    arr.push('    ssl_prefer_server_ciphers on;');
    // Load configuration files for the default server block.
    arr.push('    #Load configuration files for the default server block.');
    // 代理设置
    arr.push('    location ^~/ {');
    arr.push(`      proxy_pass http://127.0.0.1:${item.port};`);
    arr.push('      proxy_set_header Host      $host;');
    arr.push('      proxy_set_header X-Real-IP $remote_addr;');
    arr.push(
      '      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;',
    );
    // 解决单页面应用跳转404问题
    item.type === 'website'
      ? item.project_name !== 'www' &&
        arr.push('      try_files $uri $uri/ /index.html;')
      : item.project_name === 'nest' &&
        arr.push('      proxy_connect_timeout 90;');
    arr.push('    }');
    arr.push('  }');
  });
  return arr;
};
