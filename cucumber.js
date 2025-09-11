module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: [
      'features/**/*.steps.js',
      'features/support/*.js'
    ],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json'
    ],
    publishQuiet: true
  }
};
