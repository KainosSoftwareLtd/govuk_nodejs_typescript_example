# Example gov.uk TypeScript web application

This is an example NodeJS TypeScript application which includes the [GOV.UK front-end toolkit](https://github.com/alphagov/govuk_frontend_toolkit) but has been modified to be production ready. It is intended as an example and template for gov.uk beta node applications.

## Run

```
npm install # install dependencies
npm run generate-assets # pulls govuk assets and generates SASS
npm start # http://localhost:3000
```

## Overview

TODO

## Features

* GDS styles - added npm modules for GOV.UK styles and script `generate-assets` to update and compile SASS
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
* logging - TODO
* metrics - TODO
* Sample VSCode launch.json - TODO plus instructions