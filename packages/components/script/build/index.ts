import delPath from '../utils/delpath';
import { series, parallel, src, dest } from 'gulp';
import { pkgPath, componentPath } from '../utils/paths';
// sass
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import run from '../utils/run';
//删除licaige

export const removeDist = () => {
  return delPath(`${pkgPath}/licaige`);
};

//打包样式
export const buildStyle = () => {
  const sass = gulpSass(dartSass);
  return src(`${componentPath}/src/**/style/**.scss`)
    .pipe(sass.sync())
    .pipe(autoprefixer())
    .pipe(dest(`${pkgPath}/licaige/lib/src`))
    .pipe(dest(`${pkgPath}/licaige/es/src`));
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
