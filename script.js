'use strict';

const apiKey = 'QhuLpr2NRcNrx1oJ0DupVe3i65thtdM9wsftgdIh'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    // .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}'>Link to ${responseJson.data[i].name} Website</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNationalParks(query, maxResults=10) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit: maxResults,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    // .then(responseJson => console.log(JSON.stringify(responseJson)))
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $('#js-search-state').val().replace(/ /g, '');
    const maxResults = $('#js-max-results').val();
    getNationalParks(searchState, maxResults);
  });
}

$(watchForm);