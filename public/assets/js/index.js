/* eslint-disable no-invalid-this */
$(document).ready(function() {
  // animation of the menu bars
  $('.second-button').on('click', function() {
    $('.animated-icon2').toggleClass('open');
  });

  // disable the translation input field when it is blank
  $('#translation-input').on('input', function() {
    if (!$('#translation-input').val().trim()) {
      $('#translate-btn').prop('disabled', true);
    } else {
      $('#translate-btn').prop('disabled', false);
    };
  });

  // on click on translate btn store form values
  // in object and post to DB
  $('#translate-btn').click(function(event) {
    event.preventDefault();
    $('#translate-btn').prop('disabled', true);
    $('#translate-btn').html(`<span class="spinner-border 
       spinner-border-sm" role="status" aria-hidden="true"></span>`);
    // form variables
    const fromLangCode = $('#translate-from')
        .find('option:selected').attr('lang');
    const toLangCode = $('#translate-to').find('option:selected').attr('lang');
    const fromId = $('#translate-from').find('option:selected').attr('data-id');
    const toId = $('#translate-to').find('option:selected').attr('data-id');

    // prevent submit if the to/from languages are the same
    if (fromLangCode === toLangCode) {
      alert('Please select two different languages for the translation.');
      return;
    }

    $.get('/api/user_data', async function(data) {
      const translation = {
        orig_phrase: $('#translation-input').val().trim(),
        from_id: fromId,
        target_id: toId,
        lang_from: fromLangCode,
        lang_to: toLangCode,
      };
      $('#translation-input').val('');

      $.ajax({
        method: 'POST',
        url: '/api/vocab',
        data: translation,
      }).then((data)=> {
        $('#translate-btn').toggleClass('btn-primary')
            .toggleClass('btn-success').prop('disabled', false)
            .html('<i class="far fa-check-circle pr-2"></i>Success!');
        $('#translate-btn').delay(650).queue(function() {
          $(this).toggleClass('btn-primary')
              .toggleClass('btn-success').html(`Translate`)
              .prop('disabled', true);
        });

        vocab.push(data);
        newestFirst(vocab);
        $('#all-cards').empty();
        vocab.forEach((phrase) => {
          printCard(phrase);
        });
      });
    });
  });

  let vocab = [];
  // get all data for sort/filter function
  $.ajax({
    method: 'GET',
    url: '/api/vocab',
  }).then((data) => {
    vocab = data;
    console.log(vocab);
  });

  const hasChart = $('body').has('canvas');
  // $('#myChart').hide();
  if (hasChart.length !==0) {
    // ajax call to get details about all details in the person's db

    $.ajax({
      method: 'GET',
      url: '/api/vocab/details',
    }).then((data) => {
      const charCounts = [];
      const wordCounts = [];
      const labels = [];
      data.forEach((row)=> {
        wordCounts.push(row.word_count);
        charCounts.push(row.character_count);
        labels.push(row.translation);
      });
      console.log(charCounts);
      console.log(wordCounts);

      if (charCounts.length === 0) {
        $('#myChart').hide();
        $('#instructions').text(`No words in the word bank yet.`);
      }
      const ctx = document.getElementById('myChart').getContext('2d');
      // eslint-disable-next-line no-unused-vars
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: '# of Characters',
            data: charCounts,
            fill: false,
            backgroundColor: [
              'rgba(255, 99, 132)',
            ],
            borderColor: [
              'rgba(255, 99, 132)',
            ],
            borderWidth: 1,
          },
          {
            label: '# of Words',
            data: wordCounts,
            fill: false,
            backgroundColor: [
              'rgba(105, 99, 132)',
            ],
            borderColor: [
              'rgba(105, 99, 132)',
            ],
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
          },
        },
      });
    });
  }

  // delete route to remove a card
  $(document).on('click', 'i.fa-trash-alt', function() {
    // eslint-disable-next-line no-invalid-this
    const delId = $(this).attr('data-id');
    console.log(delId);

    // Send the DELETE request.
    $.ajax('/api/vocab/'+ delId, {
      type: 'DELETE',
    }).then(
        function() {
          // Reload the page to get the updated list
          location.reload();
        },
    );
  });


  // filter interactions in the word bank
  let filtered;
  $(document).on('change', '#bank-filter', function() {
    filtered = [];
    $('#sort-control').val('');
    // eslint-disable-next-line no-invalid-this
    if ($(this).val() !== 'All Languages') {
      vocab.forEach((phrase)=> {
        if (phrase.target_id == $('#bank-filter option:selected').
            attr('data-id')) {
          filtered.push(phrase);
        }
      });

      $('#all-cards').empty();
      filtered.forEach((phrase) => {
        printCard(phrase);
      });
    } else {
      $('#all-cards').empty();
      vocab.forEach((phrase) => {
        printCard(phrase);
      });
    }
  });

  // sort interactions in the word bank
  $('#sort-control').change(function() {
    if ($('#sort-control').val()==='') {
      return;
    }
    let currentArr =[];
    if ($('#bank-filter').find('option:selected').val() === 'All Languages') {
      currentArr = vocab;
    } else {
      currentArr = filtered;
    }

    if ($(this).val() === 'A-Z') {
      sortAZ(currentArr);
      $('#all-cards').empty();
      currentArr.forEach((phrase) => {
        printCard(phrase);
      });
    } else if ($(this).val() === 'Z-A') {
      sortZA(currentArr);
      $('#all-cards').empty();
      currentArr.forEach((phrase) => {
        printCard(phrase);
      });
    } else if ($(this).val() === 'Newest First') {
      newestFirst(currentArr);
      $('#all-cards').empty();
      currentArr.forEach((phrase) => {
        printCard(phrase);
      });
    } else if ($(this).val() === 'Oldest First') {
      oldestFirst(currentArr);
      $('#all-cards').empty();
      currentArr.forEach((phrase) => {
        printCard(phrase);
      });
    }
  });

  $('#gen-phrase-btn').prop('disabled', true);
  // filter for study mode
  $(document).on('change', '#study-language', function() {
    $('#lang-alert, #phrase, #show-translation-btn').hide();
    $('#randomPhrase').text('');
    $('#collapseExample').collapse('hide');

    // eslint-disable-next-line no-invalid-this
    if ($(this).val() !== 'Select Language') {
      filtered = [];
      vocab.forEach((phrase)=> {
        if (phrase.target_id == $('#study-language option:selected').
            attr('data-id')) {
          filtered.push(phrase);
        }
      });

      if (filtered.length === 0 &&
        $('#study-language option:selected').val() !== 'select-language') {
        $('#study-start').prop('disabled', true);
        $('.card-body').prepend(`<div id="lang-alert" 
        class="alert alert-warning" role="alert">
        You don't have anything in the word bank for
        ${$('#study-language option:selected').val()}. 
        Please choose a different language.</div>`);
        return;
      }
      $('#gen-phrase-btn').prop('disabled', false);
    }
  });

  // functions for study mode
  $('#show-translation-btn').hide();
  $('#gen-phrase-btn').click(function() {
    // randomly pick a card from the vocab array
    $('#random-phrase').text('');
    $('#collapseExample').collapse('hide');
    const randNum = Math.floor(Math.random() * filtered.length);
    const randomCard = filtered[randNum];
    console.log(filtered.length, randNum);
    $('#show-translation-btn').show();

    $('#study-card').empty();

    // print the contents of that card into the study-card body
    const par = $('<p id="phrase">');
    par.text(randomCard.translation);
    $('#randomPhrase').text(randomCard.orig_phrase);
    $('#study-card').append(par);
  });

  /**
 * function to print out cards to the dom
 * @param {arr} arr - The input array that should have the user's vocab
 * @return {Array} returns the updated sorted array for later updates
 */
  function sortAZ(arr) {
    arr.sort((a, b) => (a.translation > b.translation) ?
    1 : ((b.translation > a.translation) ? -1 : 0));
    return arr;
  }

  /**
 * function to print out cards to the dom
 * @param {arr} arr - The input array that should have the user's vocab
 * @return {Array} returns the updated sorted array for later updates
 */
  function sortZA(arr) {
    arr.sort((a, b) => (b.translation > a.translation) ?
    1 : ((a.translation > b.translation) ? -1 : 0));
    return arr;
  }

  /**
 * function to print out cards to the dom
 * @param {arr} arr - The input array that should have the user's vocab
 * @return {Array} returns the updated sorted array for later updates
 */
  function oldestFirst(arr) {
    arr.sort((a, b) => (a.createdAt > b.createdAt) ?
    1 : ((b.createdAt > a.createdAt) ? -1 : 0));
    return arr;
  }

  /**
 * function to print out cards to the dom
 * @param {arr} arr - The input array that should have the user's vocab
 * @return {Array} returns the updated sorted array for later updates
 */
  function newestFirst(arr) {
    arr.sort((a, b) => (b.createdAt > a.createdAt) ?
    1 : ((a.createdAt > b.createdAt) ? -1 : 0));
    return arr;
  }

  /**
 * function to print out cards to the dom
 * @param {arr} arr - The input array that should have the user's vocab
 */
  function printCard(arr) {
    const card = `<div class="col-sm-4">
    <div class="card mb-3">
      <div class="d-flex card-header bg-transparent justify-content-between">
      <i class="far fa-trash-alt text-danger"data-id="${arr.id}"></i>
    </div>
      <div class="card-body text-center">
        <h4>${arr.translation}</h4>
        <p class="mt-4 italics">${arr.orig_phrase}</p>
      </div>
    </div>
  </div>`;
    $('#all-cards').append(card);
  }
});
