# Example gov.uk TypeScript web application

This is an example NodeJS [TypeScript](https://www.typescriptlang.org/) application which includes the [GOV.UK front-end toolkit](https://github.com/alphagov/govuk_frontend_toolkit) but has been modified to be production ready. It is intended as an example and template for gov.uk beta node applications.

## Run

```
npm install # install dependencies
npm run generate-assets # pulls govuk assets and generates SASS
npm start # http://localhost:3000
```

## Overview

* `package.json` - dependencies and command scripts
* `bin/www` - start script for Express
* `src/app.ts` - Main Express application script which sets up middleware and controllers
* `src/ioc.ts` - [Inversify IoC container](https://www.npmjs.com/package/inversify), dependency injection for everything defined in `src/types.ts`
* `src/controllers` - controllers
* `public` - folder for static assets
* `views` - folder for nunjunks views
* `tests` - unit and e2e tests
* `dist` - folder for Javascript compiled from TypeScript
* `gulpfile.js` - [gulp](https://gulpjs.com/) tasks to generate assets from govuk resources
* `tsconfig.json` - TypeScript config for `tsc` compile used to generate Javascript
* `tslint.json` - TypeScript linting config setup to mimic [StandardJS](https://standardjs.com/)
* `tsoa.json` - TSOA config, see [here](https://github.com/lukeautry/tsoa) for details

### Why TypeScript?

NodeJS is great for writing applications, but the looseness of dynamic typing and lack of type definitions makes it easer for developers to write messy code and get lost in others work in a larger application. This often only becomes apparent after an application reaches a certain size/complexity. TypeScript gives developers a more consistent way to write larger applications, while still allowing the full flexibility of JavaScript if necessary.

## Features

* GDS styles - added npm modules for GOV.UK styles and package.json script `generate-assets` to update and compile SASS
* CI - automated build and deployment via Travis into Heroku - TODO
* security
  * headers - added [helmet](https://www.npmjs.com/package/helmet) TODO
  * CQRS - TODO
  * Request sanitisation - TODO
  * vulnerbility checks - TODO NCP
* gzip - added [compression](https://www.npmjs.com/package/compression) TODO
* dependency injection - TODO example of service in controller
* validation - TODO example of GDS validation
* testing
  * unit testing including mocking dependencies TODO
  * browser testing - TODO
* logging - TODO decorators?
* metrics - TODO
* Sample VSCode launch.json - TODO plus instructions