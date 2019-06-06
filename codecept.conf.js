exports.config = {
  tests: 'tests/*_test.js',
  output: './tests/output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:8080/',
      windowSize: "1920x1080"
    }
  },
  include: {
    I: './tests/steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'SimCorpChatBot'
}