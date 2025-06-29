![Art](https://i.postimg.cc/8zY58177/art.png)

![GitHub Created At](https://img.shields.io/github/created-at/id-andyyy/gulp-template?style=flat&color=EA4A4C)
![Top Language](https://img.shields.io/github/languages/top/id-andyyy/gulp-template?style=flat&color=white)
![Pet Project](https://img.shields.io/badge/pet-project-8400FF)

# Gulp Template&nbsp;🥑

A project template for web development using Gulp as a task runner. It is designed for quickly setting up a development environment and automating routine tasks such as SASS compilation, image processing, JavaScript bundling, and running a local server&nbsp;👨‍💻.

## Features

- **Two build modes**: `dev` (development) and `docs` (production).
- **HTML processing**: uses `gulp-file-include` for templating, `gulp-typograf` for applying typography rules, automatic path replacement, and WebP/retina image integration.
- **SASS/SCSS processing**: compilation to CSS, importing files by glob (`sass-glob`), creating sourcemaps for debugging, adding vendor prefixes with `autoprefixer`.
- **Image processing**: compression, conversion to WebP format, and creating SVG sprites.
- **JavaScript processing**: transpiling modern JS (ES6+) with Babel, bundling modules with Webpack.
- **Font processing**: converting from `.ttf` to `.woff` and `.woff2`.
- **Local server**: `gulp-server-livereload` to run a server with automatic page reloading on changes.
- **File watching**: Gulp watches for file changes and automatically runs the corresponding tasks.

Details in the [template](https://id-andyyy.github.io/gulp-template/).

## Technologies and Tools

![Gulp](https://img.shields.io/badge/GULP-%23CF4647.svg?style=for-the-badge&logo=gulp&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=white&color=yellow)

- **Task Runner**: Gulp
- **JavaScript**: Babel, Webpack
- **CSS**: Sass, Autoprefixer, Gulp Group CSS Media Queries, CSso
- **HTML**: Gulp File Include, Gulp Typograf, Gulp Prettier
- **Images**: Gulp Imagemin, Imagemin-webp, Gulp SVG Sprite
- **Fonts**: Gulp Fonter Fix, Gulp TTF2WOFF2
- **Development Server**: Gulp Server Livereload

## Technical Decisions

- **Modularity**: Gulp tasks are split into files and stored in the `gulp/` directory for better organization.
- **Build Separation**: Separate configurations for `dev` and `docs` allow for different optimization levels (e.g., sourcemaps for development and minification for production).
- **Image Optimization**: Automatic conversion to WebP and creation of retina (`@2x`) versions to speed up site loading.
- **SVG Sprites**: SVG icons are combined into a single sprite to reduce the number of HTTP requests.
- **Reliability**: Using `gulp-plumber` and `gulp-notify` to catch errors without stopping the entire build process.
- **HTML Templating**: `gulp-file-include` is used for reusing HTML components.
- **Typography**: Automatic text formatting based on typography rules.

Details in the [template](https://id-andyyy.github.io/gulp-template/).

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/id-andyyy/gulp-template.git
    cd gulp-template
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run development mode**:
    ```bash
    gulp
    ```

4.  **Build the production version**:
    ```bash
    gulp docs
    ```

## Project Structure

```
gulp-template/
├── build/              # Folder for development files (created automatically)
├── docs/               # Folder for production files (created automatically)
├── gulp/
│   ├── dev.js          # Tasks for development
│   ├── docs.js         # Tasks for production
│   ├── fonts-dev.js    # Font processing tasks (dev)
│   └── fonts-docs.js   # Font processing tasks (docs)
├── src/
│   ├── fonts/          # Fonts in .ttf format
│   ├── html/           # HTML files and components
│   ├── img/            # Images
│   ├── js/             # JavaScript files
│   └── scss/           # SASS/SCSS files
├── .gitignore          # Files and folders ignored by Git
├── gulpfile.js         # Main Gulp configuration file
├── package.json        # List of dependencies and project settings
└── webpack.config.js   # Webpack configuration file
```

## Feedback

I would appreciate it if you give it a star&nbsp;⭐. If you find a bug or have suggestions for improvement,
use the [Issues](https://github.com/id-andyyy/gulp-template/issues) section.

Читать на [русском&nbsp;🇷🇺](README.md)
