const gulp = require("gulp");

// Tasks
require("./gulp/dev.js");
require("./gulp/docs.js");
require("./gulp/fonts-dev.js");
require("./gulp/fonts-docs.js");

gulp.task(
  "default",
  gulp.series(
    "clean:dev",
    "fonts:dev",
    gulp.parallel(
      "html:dev",
      "sass:dev",
      "img:dev",
      "svg:dev",
      "files:dev",
      "js:dev"
    ),
    gulp.parallel("server:dev", "watch:dev")
  )
);

gulp.task(
  "docs",
  gulp.series(
    "clean:docs",
    "fonts:docs",
    gulp.parallel("html:docs", "sass:docs", "img:docs", "svg:docs", "js:docs"),
    "server:docs"
  )
);
