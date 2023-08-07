import delPath from '../utils/delpath';
import { series, parallel, src, dest } from 'gulp';
import { pkgPath, componentPath } from '../utils/paths';
// import less from 'gulp-less';
const sass = require('gulp-sass')(require('sass'));
import autoprefixer from 'gulp-autoprefixer';
import run from '../utils/run';
//删除licaige

export const removeDist = () => {
  return delPath(`${pkgPath}/licaige`);
};

//打包样式
export const buildStyle = () => {
  return (
    // src(`${componentPath}/src/**/style/**.less`)
    src(`${componentPath}/src/**/style/**.scss`)
      // .pipe(less())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(dest(`${pkgPath}/licaige/lib/src`))
      .pipe(dest(`${pkgPath}/licaige/es/src`))
  );
};

//打包组件
export const buildComponent = async () => {
  run('pnpm run build', componentPath);
};
export default series(
  async () => removeDist(),
  parallel(
    async () => buildStyle(),
    async () => buildComponent()
  )
);
