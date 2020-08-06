document.querySelector('#submit-btn').addEventListener("click", function () {
  let doi_url = (document.getElementById('doi-url').value).trim();

  let citation_format = document.getElementById('select-format').value;
  let langauge = document.getElementById('select-language').value;
  let output = document.querySelector('#message');
  let loader = document.querySelector("#loader")

  if (doi_url == '') {
    document.getElementById('doi-url').style.border='solid 2px red';
    return;
  }

  else{
    loader.style.visibility = 'visible'
  //API Calling
  fetch('https://citation.crosscite.org/format?doi=' + doi_url + '&style=' + citation_format + '&lang=' + langauge)
    .then(
      function (response) {
        if (response.status !== 200) {
          loader.style.visibility = 'hidden'
          output.style.visibility = 'visible';
          output.classList.remove("alert-success")
          output.classList.add("alert-danger");
          output.textContent = "DOI not found! ";
          return
        }

        // Examine the text in the response
        response.text().then(function (data) {
          loader.style.visibility = 'hidden'
          output.style.visibility = 'visible';
          output.classList.remove("alert-danger");
          output.classList.add("alert-success")
          output.textContent = data;
        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });

  }

})