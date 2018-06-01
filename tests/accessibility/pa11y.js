const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
const pa11y = require('pa11y')
const htmlReporter = require('pa11y-reporter-html')
const chalk = require('chalk')

const reportsPath = path.join(__dirname, 'reports.zip')

const tests = [
  pa11y('http://localhost:3000'),
  pa11y('http://localhost:3000/form-example'),
  pa11y('http://localhost:3000/form-example/1')
]

generateReportsForFailedTests()

async function generateReportsForFailedTests() {
  clearReports()

  let archive = null

  for (let test of tests) {
    let results = await test

    logTestResult(results)

    if (results.issues.length > 0) {
      archive = await createAndAppendReport(archive, results)
    }
  }

  logOverallResult(archive)

  if (archive) {
    archive.finalize()
    process.exitCode = 1  // Fail build
  }
}

function clearReports() {
  if (fs.existsSync(reportsPath)) {
    fs.unlinkSync(reportsPath)
  }
}

function logTestResult(results) {
  let resultText = results.issues.length > 0 ? chalk.red('FAILED:') : chalk.green('PASSED:')
  console.log(`${resultText} ${results.pageUrl}`)
}

async function createAndAppendReport(archive, results) {
  if (!archive) {
    archive = initArchive()
  }

  let htmlResults = await htmlReporter.results(results)
  archive.append(htmlResults, { name: generateFileName(results.pageUrl) })

  return archive
}

function initArchive() {
  archive = archiver('zip')
  let output = fs.createWriteStream(reportsPath)

  archive.pipe(output)

  return archive
}

function generateFileName(pageUrl) {
  return `${pageUrl.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`
}

function logOverallResult(archive) {
  let resultText = archive ? chalk.red('FAILED') : chalk.green('PASSED')
  console.log(`Accessibility tests ${resultText}`)
}