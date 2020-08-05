document.querySelector('#submit-btn').addEventListener("click", function () {
  let doi_url = document.getElementById('doi-url').value;
  let citation_format = document.getElementById('select-format').value;
  let langauge = document.getElementById('select-language').value;

  //API Calling
  fetch('https://citation.crosscite.org/format?doi=' + doi_url + '&style=' + citation_format + '&lang=' + langauge)
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.text().then(function (data) {
          document.querySelector('#message').style.visibility = 'visible';
          document.querySelector('#message').innerHTML = data
        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });


})