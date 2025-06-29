![Арт](https://i.postimg.cc/8zY58177/art.png)

![GitHub Created At](https://img.shields.io/github/created-at/id-andyyy/gulp-template?style=flat&color=EA4A4C)
![Top Language](https://img.shields.io/github/languages/top/id-andyyy/gulp-template?style=flat&color=white)
![Pet Project](https://img.shields.io/badge/pet-project-8400FF)

# Gulp Template&nbsp;&#129380;

Шаблон проекта для веб-разработки, использующий Gulp в качестве сборщика задач. Он предназначен для быстрой настройки рабочего окружения и автоматизации рутинных задач, таких как компиляция SASS, обработка изображений, сборка JavaScript и запуск локального сервера&nbsp;&#128104;&#8205;&#128187;.

## Функциональность

- **Два режима сборки**: `dev` (разработка) и `docs` (продакшн).
- **Обработка HTML**: использование `gulp-file-include` для шаблонизации, `gulp-typograf` для применения правил типографики, автоматическая замена путей и интеграция WebP/retina изображений.
- **Обработка SASS/SCSS**: компиляция в CSS, импорт файлов по маске (`sass-glob`), создание sourcemaps для отладки, добавление вендорных префиксов с помощью `autoprefixer`.
- **Обработка изображений**: сжатие, конвертация в формат WebP, создание SVG-спрайтов.
- **Обработка JavaScript**: транспиляция современного JS (ES6+) с помощью Babel, сборка модулей с помощью Webpack.
- **Обработка шрифтов**: конвертация из `.ttf` в `.woff` и `.woff2`.
- **Локальный сервер**: `gulp-server-livereload` для запуска сервера с автоматической перезагрузкой страницы при изменениях.
- **Отслеживание изменений**: Gulp следит за изменениями в файлах и автоматически запускает соответствующие задачи.

Подробности в [шаблоне](https://id-andyyy.github.io/gulp-template/).

## Технологии и инструменты

![Gulp](https://img.shields.io/badge/GULP-%23CF4647.svg?style=for-the-badge&logo=gulp&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=white&color=yellow)

- **Сборщик задач**: Gulp
- **JavaScript**: Babel, Webpack
- **CSS**: Sass, Autoprefixer, Gulp Group CSS Media Queries, CSso
- **HTML**: Gulp File Include, Gulp Typograf, Gulp Prettier
- **Изображения**: Gulp Imagemin, Imagemin-webp, Gulp SVG Sprite
- **Шрифты**: Gulp Fonter Fix, Gulp TTF2WOFF2
- **Сервер для разработки**: Gulp Server Livereload

## Принятые технические решения

- **Модульность**: Задачи Gulp разделены на файлы и хранятся в директории `gulp/` для лучшей организации.
- **Разделение сборок**: Отдельные конфигурации для `dev` и `docs` позволяют использовать разные уровни оптимизации (например, sourcemaps для разработки и минификация для продакшена).
- **Оптимизация изображений**: Автоматическая конвертация в WebP и создание retina-версий (`@2x`) для ускорения загрузки сайта.
- **SVG-спрайты**: SVG-иконки объединяются в один спрайт для уменьшения количества HTTP-запросов.
- **Надежность**: Использование `gulp-plumber` и `gulp-notify` для перехвата ошибок без остановки всего процесса сборки.
- **Шаблонизация HTML**: Применяется `gulp-file-include` для переиспользования HTML-компонентов.
- **Типографика**: Автоматическое форматирование текста по правилам русской типографики.

Подробности в [шаблоне](https://id-andyyy.github.io/gulp-template/).

## Начало работы

1.  **Склонируйте репозиторий**:
    ```bash
    git clone https://github.com/id-andyyy/gulp-template.git
    cd gulp-template
    ```

2.  **Установите зависимости**:
    ```bash
    npm install
    ```

3.  **Запустите режим разработки**:
    ```bash
    gulp
    ```

4.  **Собрать продакшн-версию**:
    ```bash
    gulp docs
    ```

## Структура проекта

```
gulp-template/
├── build/              # Папка с файлами для разработки (создается автоматически)
├── docs/               # Папка с файлами для продакшена (создается автоматически)
├── gulp/
│   ├── dev.js          # Задачи для разработки
│   ├── docs.js         # Задачи для продакшена
│   ├── fonts-dev.js    # Задачи для обработки шрифтов (dev)
│   └── fonts-docs.js   # Задачи для обработки шрифтов (docs)
├── src/
│   ├── fonts/          # Шрифты в формате .ttf
│   ├── html/           # HTML-файлы и компоненты
│   ├── img/            # Изображения
│   ├── js/             # JavaScript-файлы
│   └── scss/           # SASS/SCSS-файлы
├── .gitignore          # Файлы и папки, игнорируемые Git
├── gulpfile.js         # Основной файл конфигурации Gulp
├── package.json        # Список зависимостей и настроек проекта
└── webpack.config.js   # Файл конфигурации Webpack
```

## Обратная связь

Буду признателен, если вы поставите звезду&nbsp;&#11088;. Если вы нашли баг или у вас есть предложения по улучшению,
используйте раздел [Issues](https://github.com/id-andyyy/gulp-template/issues).

Read in [English&nbsp;&#127468;&#127463;](README-en.md)
