exports.config = {
  tests: 'tests/*_test.js',
  output: 'tests/output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:8080/'
    }
  },
  include: {},
  bootstrap: null,
  mocha: {},
  name: 'SimCorpChatBot'
}