const gulp = require("gulp");

// HTML
const fileInclude = require("gulp-file-include");
const typograf = require("gulp-typograf");
const webpRetinaHtml = require("gulp-webp-retina-html");
const prettier = require("@bdchauvette/gulp-prettier");

// SASS
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const sourceMaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");

// Images
const imagemin = require("gulp-imagemin");
const imageminWebp = require("imagemin-webp");
const svgsprite = require("gulp-svg-sprite");

// JS
const fs = require("fs");
const webpack = require("webpack-stream");
const babel = require("gulp-babel");

// Other
const server = require("gulp-server-livereload");
const clean = require("gulp-clean");
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

gulp.task("html:dev", function() {
  return gulp
    .src([
      "./src/html/**/*.html",
      "!./src/html/blocks/*.html",
      "!./src/html/templates/*.html",
    ])
    .pipe(changed("./build/", { hasChanged: changed.compareContents }))
    .pipe(plumber(getPlumberConfig("html:dev")))
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
    .pipe(
      prettier({
        tabWidth: 4,
        useTabs: true,
        printWidth: 182,
        trailingComma: "es5",
        bracketSpacing: false,
      })
    )
    .pipe(gulp.dest("./build/"));
});

gulp.task("sass:dev", function() {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(changed("./build/css/"))
    .pipe(plumber(getPlumberConfig("sass:dev")))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(
      replace(
        /(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
        "$1$2$3$4$6$1"
      )
    )
    .pipe(autoprefixer())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest("./build/css/"));
});

gulp.task("img:dev", function() {
  return gulp
    .src(["./src/img/**/*", "!./src/img/svgicons/**/*"])
    .pipe(changed("./build/img/"))
    .pipe(
      imagemin([
        imageminWebp({
          quality: 85,
        }),
      ])
    )
    .pipe(rename({ extname: ".webp" }))
    .pipe(gulp.dest("./build/img/"))
    .pipe(gulp.src(["./src/img/**/*", "!./src/img/svgicons/**/*"]))
    .pipe(changed("./build/img/"))
    .pipe(gulp.dest("./build/img/"));
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

gulp.task("svg:dev", function() {
  return gulp
    .src("./src/img/svgicons/**/*.svg")
    .pipe(plumber(plumber("svg:dev")))
    .pipe(svgsprite(svgSymbol))
    .pipe(gulp.dest("./build/img/svgsprite/"));
});

gulp.task("files:dev", function() {
  return gulp
    .src("./src/files/**/*")
    .pipe(changed("./build/files/"))
    .pipe(plumber(getPlumberConfig("files:dev")))
    .pipe(gulp.dest("./build/files/"));
});

gulp.task("js:dev", function() {
  return gulp
    .src("./src/js/*.js")
    .pipe(changed("./build/js/"))
    .pipe(plumber(getPlumberConfig("js:dev")))
    .pipe(babel())
    .pipe(webpack(require("./../webpack.config")))
    .pipe(gulp.dest("./build/js/"));
});

gulp.task("clean:dev", function(done) {
  if (fs.existsSync("./build/")) {
    return gulp.src("./build/", { read: false }).pipe(clean({ force: true }));
  }
  done();
});

gulp.task("server:dev", function() {
  return gulp.src("./build/").pipe(
    server({
      livereload: true,
      open: false,
      host: "0.0.0.0",
      port: 8000,
    })
  );
});

gulp.task("watch:dev", function() {
  gulp.watch("./src/scss/**/*.scss", gulp.series("sass:dev"));
  gulp.watch(
    ["./src/html/**/*.html", "./src/html/**/*.json"],
    gulp.series("html:dev")
  );
  gulp.watch("./src/img/**/*", gulp.series("img:dev"));
  gulp.watch("./src/files/**/*", gulp.series("files:dev"));
  gulp.watch("./src/img/svgicons/*", gulp.series("svg:dev"));
  gulp.watch("./src/js/**/*", gulp.series("js:dev"));
});
