# Example gov.uk TypeScript web application

[![Build Status](https://travis-ci.org/KainosSoftwareLtd/govuk_nodejs_typescript_example.svg?branch=master)](https://travis-ci.org/KainosSoftwareLtd/govuk_nodejs_typescript_example)

This is an example NodeJS [TypeScript](https://www.typescriptlang.org/) application which includes the [GOV.UK front-end toolkit](https://github.com/alphagov/govuk_frontend_toolkit) but has been modified to be production ready. It is intended as an example and template for gov.uk beta node applications.

## Run

```
npm install # install dependencies
npm run generate-assets # pulls govuk assets and generates SASS
npm start # http://localhost:3000
npm run fakeApi # http://localhost:4000
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
-* `tests/unit` - unit tests using mocha, chai and supertest, run with `npm test`
-* `tests/e2e` - browser tests using [webdriver.io](http://webdriver.io/), gulp and mocha, run with `npm run test-e2e` (needs application and fakeApi running locally)
-* `tests/accessibility` - accessibility tests and failure reports using [Pa11y](http://pa11y.org/), run with `npm run test-pa11y` (needs application and fakeApi running locally)
-* `tests/wdio.conf` - e2e browser tests configuration file
* `dist` - folder for Javascript compiled from TypeScript
* `gulpfile.js` - [gulp](https://gulpjs.com/) tasks to generate assets from govuk resources
* `tsconfig.json` - TypeScript config for `tsc` compile used to generate Javascript
* `tslint.json` - TypeScript linting config setup to mimic [StandardJS](https://standardjs.com/)
* `tsoa.json` - TSOA config, see [here](https://github.com/lukeautry/tsoa) for details
* `.nycrc` - NYC/Istanbul config for code coverage, run with `npm run coverage` and `npm run check-coverage` to measure code coverage against predefined metric

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
  * cross-site scripting - added [csurf](https://github.com/expressjs/csurf) package which uses cookies to protect against [XSS](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)), see [here](https://github.com/pillarjs/understanding-csrf) for how this works. Any forms with a POST method, see `FormExample.html`, should have the `csurf-token.html` embedded. The token in the view is compared with the token in the cookie. Removing/changing the cookie token before submitting form will produce a csrf error.
  * vulnerbility checks - [NPM security check](https://docs.npmjs.com/getting-started/running-a-security-audit), vulnerble packages will be flagged during `npm install`, run `npm audit` to get more details
* gzip - added [compression](https://www.npmjs.com/package/compression)
* dependency injection - example of service in controller - AM created service that calls fake api (npm server-json). Posts form data and displays a summary of form input. Added service to IOC and used inversify to facilitate dependency injection into formExampleController. Mocked service in tests using npm ts-mockito
* validation - see `FormExampleController.ts`, `FormExampleModel.ts` and `formExample.html` for example of form post endpoint that displays GDS styled validation errors against fields (with links) using validation decorators ([class-validator](https://www.npmjs.com/package/class-validator))
* list view - see `ListExampleController.ts` for example of displaying tabular data, examples of GDS patterns for this are available in the [design system](https://design-system.service.gov.uk/components/table/) and on the [performance platform](https://www.gov.uk/performance/services?sortby=number_of_transactions&sortorder=descending)
* testing
  * unit testing including mocking dependencies - unit testing of formExampleController with service mocked using mokito
  * browser testing - using [webdriver.io](http://webdriver.io/) to create browser tests, the configuration can be extended to call into remote selenium grids and services like [Saucelabs](https://saucelabs.com/) and [BrowserStack](https://www.browserstack.com/)
  * accessibility testing - using [Pa11y](http://pa11y.org/) to test supplied URLs and generate HTML reports for any failures. [Wave Toolbar](https://wave.webaim.org/extension/) also should be used to manually test pages in-browser - different tools catch different issues!
  * Code Coverage - generate test coverage reports for application using `npm run coverage` or `npm run check-coverage` (fails on <70%). See [here](https://istanbul.js.org/docs/tutorials/mocha/) for details
* logging - TODO decorators?
* metrics - TODO
* Sample VSCode launch.json - see `.sample-vscode`, copy the `launch.json` to `.vscode` for example build configurations to debug the application and run individual mocha tests
* Configuration

    TODO see [here](https://github.com/ministryofjustice/apvs-external-web/blob/develop/config.js) for an example, move FormClientUrl env to config.ts and delete me.

    All application configuration is via environment variables which are defined in a single script `src/config.ts`, as this is easy to configure when deploying into docker containers or PAAS.

    As applications grow in size there will be a lot of Environment Variables, so we need to keep them in a single script so the application is self documenting and easier for someone unfamiliar to understand, providing a single file to look at rather than searching the code. The config script should supply defaults and comments to explain the config if appropriate and necessary, so environmental differences are easy to identify.
* debug - see `.vscode/launch.json`, this is where debug profiles are defined which currently includes profiles to debug the application, run individual mocha tests and run all mocha tests
* Healthchecks - Example Healthcheck controller `src/controllers/HealthcheckController.ts` exposes two endpoints `/status` and `/healthcheck`, see [here](https://stevenwilliamalexander.wordpress.com/2017/09/19/service-healthcheck-pattern/) for details

## Updating to new govuk-frontend

The prototype was updated to use the new [GDS design system](https://design-system.service.gov.uk) which has different SASS styles and static assets. Below is some notes on the steps used to update the application. See [here](https://design-system.service.gov.uk/get-started/updating-your-code/) and [here](https://github.com/alphagov/govuk-frontend/blob/master/docs/installation/installing-with-npm.md) for more details.

The majority of the effort is identifying the css changes in your views and manually testing that they still display correctly. This is because the names of css classes have changed and it is now necessary to add classes to tags were previously styles were inherited (e.g. `<p class="govuk-body>` and table tags). This effort will scale linearly with the amount and complexity of your views.

For detailed changes see here TODO git commit diff.

*Assets*
* Minor changes to how gulp is used in `generate-assets` task, no longer moving template as it is used directly from nunjucks in `node_modules`

*Package.json*
* Removed `govuk-elements-sass`, `govuk_frontend_toolkit` and `govuk_template_jinja`, replaced with `govuk-frontend`
* Removed `express-nunjucks` and added `nunjucks` so could use `govuk-frontend` components directly as templates, this also requires changes to app.ts and tests to add view engine

*Javascript*
* Moved initialising Javascript from `application.js` into `views/layout.html` for hide/show sections as it is now in a single `govuk-frontend/all.js`

*SASS*
* Explicitly set asset path variable to match new location of gov-frontend assets
* Update import to new nodemodules path

*JavaScript*
* Include new govuk `all.js` in layout and remove initiation from application script

*Template and layouts*
* Replace phase banner with new component and move into layout, see [here](https://design-system.service.gov.uk/components/phase-banner/)
* Replace footer links with new component, see [here](https://design-system.service.gov.uk/components/footer/)
* In layouts, Nunjucks variable names have been updated from snake_case to camelCase, e.g. `page_title` to `pageTitle`.
* Removed cooke warning banner, as there is no supplied template for this. An example is available [here](https://github.com/alphagov/govuk-design-system/blob/0128dac77fe8510428c027fa6cf80ffaa646fecd/views/partials/_cookie-banner.njk) but it is not part of `govuk-frontend` yet and needs a custom implementation.

*Views*
* Remove `<main id="content" role="main">` tag, this is now included in `{% block main%}` in supplied `template.njk`
* Find/replace header classes to new class names, e.g. `heading-xlarge` to `govuk-heading-xl`, see [here](https://design-system.service.gov.uk/get-started/updating-your-code/) for details
* Append `govuk-` to specifc css classes, e.g. `grid-row` to `govuk-grid-row`, see [here](https://design-system.service.gov.uk/get-started/updating-your-code/) for details. This affects multiple elements, such as button/lists, and some classes have `--` on last part of class name.
* Add `class="govuk-body"` to all `<p>` tags (previously they inherited correct styles)
* Add table specific classes to all table/thead/tbody/tr/th/td tags (much more verbose than previously needed), e.g. `govuk-table__body`, see [here](https://design-system.service.gov.uk/components/table/)