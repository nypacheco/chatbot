var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var btn = document.getElementById('analyze-btn');
var input = document.getElementById('input');
var output = document.getElementById('output');

function getToken() {
  return fetch('/api/token/tone_analyzer').then(function(response) {
    return response.text();
  });
}

function analyze(token) {
  const toneAnalyzer = new ToneAnalyzerV3({
    token: token,
    version_date: '2016-05-19'
  });
  toneAnalyzer.tone(
    {
      text: input.value
    },
    function(err, result) {
      if (err) {
        output.innerHTML = err;
        return console.log(err);
      }
      output.innerHTML = JSON.stringify(result, null, 2);
    }
  );
}

btn.onclick = function() {
  getToken().then(analyze);
};