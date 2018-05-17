# Example gov.uk TypeScript web application

[![Build Status](https://travis-ci.org/KainosSoftwareLtd/govuk_nodejs_typescript_example.svg?branch=master)](https://travis-ci.org/KainosSoftwareLtd/govuk_nodejs_typescript_example) [![NSP Status](https://nodesecurity.io/orgs/kainosnodeexamples/projects/9cbfc674-5539-4e40-bea0-c088fbfe4581/badge)](https://nodesecurity.io/orgs/kainosnodeexamples/projects/9cbfc674-5539-4e40-bea0-c088fbfe4581)

This is an example NodeJS [TypeScript](https://www.typescriptlang.org/) application which includes the [GOV.UK front-end toolkit](https://github.com/alphagov/govuk_frontend_toolkit) but has been modified to be production ready. It is intended as an example and template for gov.uk beta node applications.

## Run

```
npm install # install dependencies
npm run generate-assets # pulls govuk assets and generates SASS
npm start # http://localhost:3000
```

### Windows 10 Pre-requisites

```
npm install --global --production windows-build-tools` # from an elevated PowerShell or CMD.exe (run as Administrator).
npm install -g node-gyp
```

## Overview

* `package.json` - dependencies and command scripts
* `bin/www` - start script for Express
* `src/app.ts` - Main Express application script which sets up middleware and controllers
* `src/ioc.ts` - [Inversify IoC container](https://www.npmjs.com/package/inversify), dependency injection for everything defined in `src/types.ts`
* `src/controllers` - controllers
* `src/middleware` - custom request chain middleware such as error handling and security
* `src/models` - models with validation decorators using [class-validator](https://www.npmjs.com/package/class-validator)
* `src/validators` - custom validators and helpers
* `public` - folder for static assets
* `views` - folder for nunjunks views
* `tests/unit` - unit tests using mocha, chai and supertest, run with `npm test`
* `tests/e2e` - browser tests using [webdriver.io](http://webdriver.io/), gulp and mocha, run with `npm run test-e2e` (needs application running locally)
* `tests/wdio.conf` - e2e browser tests configuration file
* `dist` - folder for Javascript compiled from TypeScript
* `gulpfile.js` - [gulp](https://gulpjs.com/) tasks to generate assets from govuk resources
* `tsconfig.json` - TypeScript config for `tsc` compile used to generate Javascript
* `tslint.json` - TypeScript linting config setup to mimic [StandardJS](https://standardjs.com/)
* `tsoa.json` - TSOA config, see [here](https://github.com/lukeautry/tsoa) for details

### Why TypeScript?

NodeJS is great for writing applications, but the looseness of dynamic typing and lack of type definitions makes it easer for developers to write messy code and get lost in others work in a larger application. This often only becomes apparent after an application reaches a certain size/complexity. TypeScript gives developers a more consistent way to write larger applications, while still allowing the full flexibility of JavaScript if necessary.

## How to use

Clone or copy the source into your own project. There are sections marked with `TODO` which you will need to update for your service.

## Features

* GDS styles - added npm modules for GOV.UK styles and package.json script `generate-assets` to update and compile SASS
* CI - automated build and deployment via Travis, see `.travis.yml`
* security
  * headers - added [helmet](https://www.npmjs.com/package/helmet)
  * Request sanitisation - TODO
  * cross-site scripting - added [csurf](https://github.com/expressjs/csurf) package which uses cookies to protect against [XSS](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)), see [here](https://github.com/pillarjs/understanding-csrf) for how this works. Any forms with a POST method, see `FormExample.html`, should have the `csurf-token.html` embedded. The token in the view is compared with the token in the cookie. Removing/changing the cookie token before submitting form with produce a csrf error.
  * vulnerbility checks - NSP, see badge and run locally with `npm run audit` (replace with `npm audit` after [NPM 6 release](https://medium.com/npm-inc/announcing-npm-6-5d0b1799a905))
* gzip - added [compression](https://www.npmjs.com/package/compression)
* dependency injection - TODO example of service in controller
* validation - see `FormExampleController.ts`, `FormExampleModel.ts` and `formExample.html` for example of form post endpoint that displays GDS styled validation errors against fields (with links) using validation decorators ([class-validator](https://www.npmjs.com/package/class-validator))
* testing
  * unit testing including mocking dependencies TODO
  * browser testing - using [webdriver.io](http://webdriver.io/) to create browser tests, the configuration can be extended to call into remote selenium grids and services like [Saucelabs](https://saucelabs.com/) and [BrowserStack](https://www.browserstack.com/)
* logging - TODO decorators?
* metrics - TODO
* debug - see `.vscode/launch.json`, this is where debug profiles are defined which currently includes profiles to debug the application, run individual mocha tests and run all mocha tests
