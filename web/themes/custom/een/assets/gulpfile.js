import { createRequire } from 'module'
import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import imagemin, {svgo} from 'gulp-imagemin';
import imageminUpng from 'imagemin-upng'
import svgSymbols from 'gulp-svg-symbols';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import merge from "merge-stream";
import javascriptObfuscator from 'gulp-javascript-obfuscator';
import customConfig from './config.js';

const sass = gulpSass( dartSass );
const defaultConfig = {
  paths: {
    dist: './dist',
    sass: './src/sass/**/*.scss',
    css: './dist/css',
    fontsSrc: './src/fonts/**/*',
    fontsDest: './dist/fonts',
    jsSrc: './src/js/**/*.js',
    jsDest: './dist/js',
    imgSrc: './src/img/**/*.{png,jpg,gif}',
    imgDest: './dist/img',
    svgSrc: './src/svg/**/*.svg',
    svgDest: './dist/svg',
    spriteSrc: './src/sprite/**/*.svg',
    spriteTpl: './src/sprite/template.svg',
    libs: []
  }
}

/**
 *  Merge config from config.js
 */
function deepMerge(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        }
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return target;
}

const config = deepMerge(defaultConfig, customConfig);

/**
 * Copy libs from node_modules defined in config.js
 */
function copyLibs() {
  if (!config.paths.libs.length) {
    return gulp.src('.');
  }
  const streams = config.paths.libs.map(lib => gulp.src(lib.src).pipe(gulp.dest(lib.dest)));
  return merge(streams);
}

/**
 *  Copy font files
 */
function copyFonts() {
  return gulp
      .src(config.paths.fontsSrc)
      .pipe(gulp.dest(config.paths.fontsDest));
}

/**
 * Copy JS files
 * JS compression
 */
function customScripts() {
  return gulp
      .src(config.paths.jsSrc)
      .pipe(javascriptObfuscator({
          compact: true
      }))
      .pipe(uglify({
        sourceMap: true
      }))
      .pipe(gulp.dest(config.paths.jsDest));
}

/**
 * Convert SCSS files to CSS
 * CSS compression
 * Autoprefixer
 */
function customSass() {
  return gulp
      .src(config.paths.sass)
      .pipe(
          sass({
            outputStyle: 'compressed'
          }))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.paths.css));
}

/**
 * Minify images
 */
function minifyImages() {
  return gulp
      .src(config.paths.imgSrc)
      .pipe(imagemin([
        imageminUpng()
      ]))
      .pipe(gulp.dest(config.paths.imgDest));
}

/**
 * Minify SVGs
 */
function minifySVGs() {
  return gulp
      .src([config.paths.svgSrc, config.paths.spriteSrc, config.paths.spriteTpl.replace('./', '!')])
      .pipe(imagemin([
        svgo({
          removeViewBox: false,
          removeDesc: false,
          removeTitle: false
        })
      ]))
      .pipe(gulp.dest(config.paths.svgDest));
}

/**
 * Generates an svg sprite from all .svg files in the svg folder
 */
function SVGSprite() {
  return gulp
      .src([config.paths.spriteSrc, config.paths.spriteTpl.replace('./', '!')])
      .pipe(
          svgSymbols({
            id: 'icon--%f',
            svgAttrs: {
              class: 'icon__sprite',
            },
            templates: [config.paths.spriteTpl]
          })
      )
      .pipe(gulpif(/[.]svg$/, rename('sprite.svg')))
      .pipe(gulpif(/[.]svg$/, gulp.dest(config.paths.svgDest)));
}

/**
 * Watch files
 */
function watch() {
  // Sass
  gulp.watch(
      config.paths.sass,
      {interval: 500},
      gulp.series(customSass)
  );
  // JS
  gulp.watch(
      config.paths.jsSrc,
      {interval: 500},
      gulp.series(customScripts)
  );
}

const styles = gulp.parallel(customSass);
const scripts = gulp.parallel(customScripts);

gulp.task('build', gulp.series(styles, scripts, copyFonts, minifyImages, minifySVGs, SVGSprite, copyLibs));
gulp.task('watch', gulp.series(watch));
gulp.task('start', gulp.series(styles, scripts, copyFonts, minifyImages, minifySVGs, SVGSprite, copyLibs, watch));
