## 为什么要引入 husky?

虽然我们项目中引入了`prettier`和`eslint`对代码格式进行了校验,但是多人开发的时候难免依然会有人提交不符合规范的代码到仓库中,如果我们拉取到这种代码还得慢慢对其进行修改,这是一件很麻烦的事情。因此我们可以引入 husky 来从源头上解决此类问题。简单来说,husky 可以在我们提交代码之前校验我们的代码是否符合我们配置的规范。接下来就让我们看一下 husky 的具体使用吧!

## husky 的使用

首先安装

```
pnpm i husky -D -w
```

在 package.json 中 scripts 中设置 prepare 钩子:`husky install`,在使用`pnpm install`的时候就会自动执行`husky`,以便于别人拉取完我们代码进行`pnpm insall`的时候直接进行`husky install`。我们可以使用命令

```
pnpm pkg set scripts.prepare="husky install"
```

或者你也可以手动添加

```js

 "scripts": {
    ...
    "prepare": "husky install"
  },
```

因为我们没有执行`pnpm install`,所以要先执行一下

```
npx husky install
```

然后添加一个 commit 钩子文件

```
npx husky add .husky/pre-commit "npm run xxx"
```

然后我们就会发现根目录出现了.husky/pre-commit 文件,我们修改一下 commit 之前的命令,让其提交之前先进行 lint 校验

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm run lint:script
pnpm run lint:style
```

修改一个不符合 eslint 的规范文件,然后进行提交之后你会发现它会先自动给你修复之后再进行提交,如果无法修复则抛出一个错误

## commitlint 的安装与使用

我们看开源项目的时候会看到他们代码提交信息会有诸如`feat: 添加xxx`,`fix: 修复xxxbug`之类的信息,其实这些也是有一个规范的,下面列举一些常用的 git 提交规范

- build 编译相关的修改，例如发布版本、对项目构建或者依赖的改动

- chore 其他修改, 比如改变构建流程、或者增加依赖库、工具等

- ci 持续集成修改

- docs 文档修改

- feat 新特性、新功能

- fix 修改 bug

- perf 优化相关，比如提升性能、体验

- refactor 代码重构

- revert 回滚到上一个版本

- style 代码格式修改, 注意不是 css 修改

- test 测试用例修改

为了让我们团队都使用这些提交规范我们就需要用到`commitlint`,首先我们需要安装几个工具

```
pnpm install --save-dev @commitlint/config-conventional @commitlint/cli -w
```

其中` @commitlint/config-conventional` 是一个规范配置,标识采用什么规范来执行消息校验, 这个默认是 Angular 的提交规范,`@commitlint/cli` 是一个使用 lint 规则来校验提交记录的命令行工具

新建`commitlint.config.cjs`,这里可以自定义配置 git 提交的 message 规范

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```

然后在.husky/commit-msg 中添加`npx --no -- commitlint --edit "$1"`

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit "$1"
```

然后提交一个不符合规范的 type,就会发现报错了

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e00a5bca95a443291bb78a4c0fbce36~tplv-k3u1fbpfcp-watermark.image?)

正确提交方式应为`<type>(<?scope>): <subject>`,例如

```
feat(global): 添加commitlint规范
```

## 配置 lint-staged

我们根据上面的配置是可以实现我们想要的效果的,但是我们会发现每次提交代码的时候 ESlint 或 Stylelint 都会检查所有文件,而我们需要的是只让它们检测新增的文件,因此我们可以使用`lint-staged`来解决这个问题

首先安装`lint-staged`

```
pnpm add lint-staged -D -w
```

然后再 package.json 中进行配置

```js
{
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,vue}": [
      "eslint --ext .js,.jsx,.vue,.ts,.tsx --fix --quiet ./",
      "stylelint --fix \"packages/components/src/**/*.{css,less}\""
    ]
  },
    "scripts": {
    "lint-staged": "lint-staged"
  },
}
```

最后修改一下``.husky/pre-commit

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm run lint-staged

```

ok,现在它只会检测我们添加到暂存区的文件了
