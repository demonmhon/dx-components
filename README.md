# DX Components

Web component built with [lit](https://lit.dev/)

## Development

Install dependencies, run build command and dev server

```sh
$ npm install
```

Run multiple commands with [concurrently](https://www.npmjs.com/package/concurrently). Or run command separately session.

```sh
$ npm start
```

```sh
$ npm run dev
$ npm run dev:server
```

Build distribution using [Rollup](https://rollupjs.org/guide/en/)

```sh
$ npm run build
```

## Installation

```sh
$ npm install @demonmhon/dx-components
```

## Usage

```js
import '@demonmhon/dx-components';
import '@demonmhon/dx-components/dist/themes/themes.css';
```

```html
<dx-button></dx-button>
```

### Themes

Default theme is `"light"`. You may set the prefferred theme with `data-dx-theme` attribute in `<html>`


```html
<html data-dx-theme="light">
<html data-dx-theme="dark">
```

```js
document.documentElement.setAttribute('data-dx-theme', 'light');
```