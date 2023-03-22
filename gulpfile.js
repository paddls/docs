const options = require('./config');

const {src, dest, watch, series, parallel} = require('gulp');
const rename = require('gulp-rename');
const rimraf = require('rimraf');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const logSymbols = require('log-symbols');
const fileinclude = require('gulp-file-include');

const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const rollup = require('@rollup/stream');
const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve');

let cache;

function livePreviewTask(done) {
  browserSync.init({
    server: {
      baseDir: options.paths.dist
    },
    port: options.config.port || 5000
  });
  done();
}

function watchFilesTask() {
  watch(`${options.paths.src.base}/**/*.html`, series(htmlTask, stylesTask, previewReloadTask));
  watch([options.config.tailwindjs, `${options.paths.src.css}/**/*.scss`], series(stylesTask, previewReloadTask));
  watch(`${options.paths.src.js}/**/*.js`, series(scriptsTask, previewReloadTask));
  watch(`${options.paths.src.img}/**/*`, series(imagesTask, previewReloadTask));
  console.log("\n\t" + logSymbols.info, "Watching for Changes..\n");
}

function previewReloadTask(done) {
  console.log("\n\t" + logSymbols.info, "Reloading Browser Preview.\n");
  browserSync.reload();
  done();
}

function cleanTask(callback) {
  console.log("\n\t" + logSymbols.info, "Cleaning dist folder for fresh start.\n");
  return rimraf(options.paths.dist, callback);
}

function htmlTask() {
  return src([`${options.paths.src.views}/**/*.html`])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
    }))
    .pipe(rename({dirname: ''}))
    .pipe(dest(options.paths.dist));
}

function fontAwesomeTask() {
  return src('node_modules/@fortawesome/fontawesome-pro/webfonts/*')
    .pipe(dest(options.paths.dist + '/webfonts/'));
}

function stylesTask() {
  const tailwindcss = require('tailwindcss');
  return src(`${options.paths.src.css}/main.scss`).pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      tailwindcss(options.config.tailwindjs),
      require('autoprefixer'),
    ]))
    .pipe(concat({path: 'style.css'}))

    .pipe(rename({dirname: ''}))
    .pipe(dest(options.paths.dist));
}

function scriptsTask() {
  return rollup({
    input: `${options.paths.src.js}/main.js`,
    plugins: [nodeResolve({browser: true}), commonjs(), babel()],
    cache: cache,
    output: {
      name: 'scripts',
      format: 'iife',
      sourcemap: true
    }
  })
    .on('bundle', function (bundle) {
      cache = bundle;
    })
    .pipe(source('scripts.js'))
    .pipe(rename({dirname: ''}))
    .pipe(buffer())
    .pipe(dest(options.paths.dist));
}

function imagesTask() {
  return src(`${options.paths.src.img}/**/*`)
    .pipe(imagemin())
    .pipe(rename({dirname: 'img'}))
    .pipe(dest(options.paths.dist));
}

function fontsTask() {
  return src(`${options.paths.src.font}/**/*`)
    .pipe(rename({dirname: 'fonts'}))
    .pipe(dest(options.paths.dist));
}

function buildProdFinishTask(done) {
  console.log("\n\t" + logSymbols.info, `Production build is complete. Files are located at ${options.paths.dist}\n`);
  done();
}

exports.default = series(
  cleanTask,
  parallel(
    fontAwesomeTask,
    stylesTask,
    scriptsTask,
    imagesTask,
    htmlTask,
    fontsTask
  ),
  livePreviewTask,
  watchFilesTask
);

exports.prod = series(
  cleanTask,
  parallel(
    fontAwesomeTask,
    stylesTask,
    scriptsTask,
    imagesTask,
    htmlTask,
    fontsTask
  ),
  buildProdFinishTask
);
