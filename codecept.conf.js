exports.config = {
  tests: './*_test.js',
  output: './output',
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