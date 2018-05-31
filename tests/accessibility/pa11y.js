const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
const pa11y = require('pa11y')
const htmlReporter = require('pa11y-reporter-html')

const reportsPath = path.join(__dirname, 'reports.zip')

let archive

const tests = [
  // pa11y('http://localhost:3000/form-example/3') <- add URL to test here
]

generateReportsForFailedTests()

async function generateReportsForFailedTests() {
  clearReports()

  for (let test of tests) {
    let results = await test

    if (results.issues.length > 0) {
      await createReport(results)
    }
  }

  if (archive) {
    archive.finalize()
    throw 'Accessibility tests FAILED' // Fail build
  }
}

function clearReports() {
  if (fs.existsSync(reportsPath)) {
    fs.unlinkSync(reportsPath)
  }
}

async function createReport(results) {
  if (!archive) {
    initArchive()
  }

  let htmlResults = await htmlReporter.results(results)
  archive.append(htmlResults, { name: generateFileName(results.pageUrl) })
}

function initArchive() {
  archive = archiver('zip')
  let output = fs.createWriteStream(reportsPath)

  archive.pipe(output)
}

function generateFileName(pageUrl) {
  return `${pageUrl.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`
}