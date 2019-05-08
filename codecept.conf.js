exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:8080/',
      chrome :{
        args: ["--no-sandbox"]
}
    }
  },
  include: {},
  bootstrap: null,
  mocha: {},
  name: 'SimCorpChatBot'
}