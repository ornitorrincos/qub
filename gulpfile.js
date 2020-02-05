const gulp = require("gulp");
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const browserify = require("browserify");
const source = require("vinyl-source-stream");

const paths = {
    tsInput: "src/index.ts",
    ts: "src/**/*.ts",
    tsx: "src/**/*.tsx",
    html: "./html/**/*.html",
    scss: "./scss/**/*.scss",
    dest: "./dist"
}

function serve () {
    return connect.server({
        host: "0.0.0.0",
        root: paths.dest,
        livereload: true
    });
};

function html () {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.dest))
        .pipe(connect.reload());
};

function style () {
    return gulp.src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest))
        .pipe(connect.reload());
}

function typescript () {
    return browserify()
    .add(paths.tsInput)
    .plugin("tsify", { sourcemaps: true })
    .bundle()
    .on("error", function (err) {
        console.log(err);
    })
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(paths.dest))
    .pipe(connect.reload())
}

function watch () {
    return gulp.watch([paths.html, paths.scss, paths.ts, paths.tsx], gulp.parallel(typescript, html, style));
};

exports.build = gulp.parallel(typescript, html, style);
exports.default = gulp.series(gulp.parallel(typescript, html, style), gulp.parallel(serve, watch));
