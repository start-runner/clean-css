# start-clean-css

[![npm](https://img.shields.io/npm/v/start-clean-css.svg?style=flat-square)](https://www.npmjs.com/package/start-clean-css)
[![linux build](https://img.shields.io/travis/start-runner/clean-css.svg?label=linux&style=flat-square)](https://travis-ci.org/start-runner/clean-css)
[![windows build](https://img.shields.io/appveyor/ci/start-runner/clean-css.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/start-runner/clean-css)
[![coverage](https://img.shields.io/codecov/c/github/start-runner/clean-css.svg?style=flat-square)](https://codecov.io/github/start-runner/clean-css)
[![deps](https://img.shields.io/gemnasium/start-runner/clean-css.svg?style=flat-square)](https://gemnasium.com/start-runner/clean-css)

[CleanCSS](https://github.com/jakubpawlowicz/clean-css) task for [Start](https://github.com/start-runner/start).

## Install

```
npm i -S start-clean-css
```

## Usage

```js
import start from 'start';
import reporter from 'start-pretty-reporter';
import files from 'start-files';
import clean from 'start-clean';
import read from 'start-read';
import less from 'start-less';
import rename from 'start-rename';
import cleanCSS from 'start-clean-css';
import write from 'start-write';

export function build() {
    return start(reporter())(
        files('build/'),
        clean(),
        files('lib/**/*.less'),
        read(),
        less({ sourceMap: true }),
        rename(file => file.replace(/\.less$/, '.css')),
        write('build/'),
        cleanCSS({ sourceMap: true }),
        rename(file => file.replace(/\.css$/, '.min.css')),
        write('build/')
    );
}
```

This task relies on `[{ path, data, map }]` input and provides the same, see [documentation](https://github.com/start-runner/start#readme) for details.

## Arguments

`cleanCSS(options)`

* `options` – [CleanCSS options](https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api), `{ rebase: false, sourceMapInlineSources: true }` by default
