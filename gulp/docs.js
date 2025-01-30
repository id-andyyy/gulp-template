const gulp = require("gulp");

// HTML
const fileInclude = require("gulp-file-include");
const typograf = require("gulp-typograf");
const webpRetinaHtml = require("gulp-webp-retina-html");
const htmlclean = require("gulp-htmlclean");

// SASS
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const csso = require("gulp-csso");
const autoprefixer = require("gulp-autoprefixer");
const groupMedia = require("gulp-group-css-media-queries");

// Images
const imagemin = require("gulp-imagemin");
const imageminWebp = require("imagemin-webp");
const svgsprite = require("gulp-svg-sprite");

// JS
const webpack = require("webpack-stream");
const babel = require("gulp-babel");

// Other
const server = require("gulp-server-livereload");
const clean = require("gulp-clean");
const fs = require("fs");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const changed = require("gulp-changed");
const path = require("path");
const replace = require("gulp-replace");
const rename = require("gulp-rename");

const getPlumberConfig = (title) => {
  return {
    errorHandler: notify.onError({
      title,
      message: "Error <%= error.message %>",
      sound: false,
    }),
  };
};

const fileIncludeConfig = {
  prefix: "@@",
  basepath: "@file",
};

gulp.task("html:docs", function() {
  return gulp
    .src([
      "./src/html/**/*.html",
      "!./src/html/blocks/*.html",
      "!./src/html/templates/*.html",
    ])
    .pipe(changed("./docs/"))
    .pipe(plumber(getPlumberConfig("html:docs")))
    .pipe(fileInclude(fileIncludeConfig))
    .pipe(
      replace(/<img(?:.|\n|\r)*?>/g, function(match) {
        return match.replace(/\r?\n|\r/g, "").replace(/\s{2,}/g, " ");
      })
    )
    .pipe(
      replace(
        /(?<=src=|href=|srcset=)(['"])(\.(\.)?\/)*(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
        "$1./$4$5$7$1"
      )
    )
    .pipe(
      typograf({
        locale: ["ru", "en-US"],
        htmlEntity: { type: "digit" },
        safeTags: [
          ["<\\?php", "\\?>"],
          ["<no-typography>", "</no-typography>"],
        ],
      })
    )
    .pipe(
      webpRetinaHtml({
        extensions: ["jpg", "jpeg", "png", "gif", "webp"],
        retina: {
          1: "",
          2: "@2x",
        },
      })
    )
    .pipe(htmlclean())
    .pipe(gulp.dest("./docs/"));
});

gulp.task("sass:docs", function() {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(changed("./docs/css/"))
    .pipe(plumber(getPlumberConfig("sass:docs")))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(groupMedia())
    .pipe(
      replace(
        /(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
        "$1$2$3$4$6$1"
      )
    )
    .pipe(csso())
    .pipe(gulp.dest("./docs/css/"));
});

gulp.task("img:docs", function() {
  return gulp
    .src(["./src/img/**/*", "!./src/img/svgicons/**/*"])
    .pipe(changed("./docs/img/"))
    .pipe(
      imagemin([
        imageminWebp({
          quality: 85,
        }),
      ])
    )
    .pipe(rename({ extname: ".webp" }))
    .pipe(gulp.dest("./docs/img/"))
    .pipe(gulp.src("./src/img/**/*"))
    .pipe(changed("./docs/img/"))
    .pipe(
      imagemin(
        [
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 85, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
        ],
        { verbose: true }
      )
    )
    .pipe(gulp.dest("./docs/img/"));
});

const svgSymbol = {
  mode: {
    symbol: {
      sprite: "../sprite.symbol.svg",
    },
  },
  shape: {
    id: {
      generator: function(name, file) {
        const folderName = path.basename(path.dirname(file.relative));
        const fileName = path.basename(
          file.relative,
          path.extname(file.relative)
        );

        if (folderName === ".") return fileName;
        return `${folderName}-${fileName}`;
      },
    },
    transform: [
      {
        svgo: {
          js2svg: { indent: 4, pretty: true },
          plugins: [
            {
              name: "removeAttrs",
              params: {
                attrs: "(fill|stroke)",
              },
            },
          ],
        },
      },
    ],
  },
};

gulp.task("svg:docs", function() {
  return gulp
    .src("./src/img/svgicons/**/*.svg")
    .pipe(plumber(plumber("svg:docs")))
    .pipe(svgsprite(svgSymbol))
    .pipe(gulp.dest("./docs/img/svgsprite/"));
});

gulp.task("files:docs", function() {
  return gulp
    .src("./src/files/**/*")
    .pipe(changed("./docs/files/"))
    .pipe(gulp.dest("./docs/files/"));
});

gulp.task("js:docs", function() {
  return gulp
    .src("./src/js/*.js")
    .pipe(changed("./docs/js/"))
    .pipe(plumber(getPlumberConfig("js:docs")))
    .pipe(babel())
    .pipe(webpack(require("../webpack.config")))
    .pipe(gulp.dest("./docs/js/"));
});

gulp.task("clean:docs", function(done) {
  if (fs.existsSync("./docs/")) {
    return gulp.src("./docs", { read: false }).pipe(clean({ force: true }));
  }
  done();
});

gulp.task("server:docs", function() {
  return gulp.src("./docs").pipe(
    server({
      livereload: true,
      open: false,
      host: "0.0.0.0",
      port: 8000,
    })
  );
});
