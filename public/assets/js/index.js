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
    const fromId = $('#translate-from').find('option:selected').attr('id');
    const toId = $('#translate-to').find('option:selected').attr('id');

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
        location.reload();
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

  // const hasChart = $('body').has('canvas');
  // $('#myChart').hide();
  // if (hasChart.length !==0) {
  //   // ajax call to get details about all details in the person's db

  //   $.ajax({
  //     method: 'GET',
  //     url: '/api/vocab/details',
  //   }).then((data) =>{
  //     const phrases = data.filter((row) => row.target_id = 2);
  //     const phraseChars = [];
  //     phrases.forEach((row) => {
  //       phraseChars.push(row.word_count);
  //     });
  //     const labels = [];
  //     phrases.forEach((row) => {
  //       labels.push(row.translation);
  //     });


  //     const ctx = document.getElementById('myChart').getContext('2d');
  //     // eslint-disable-next-line no-unused-vars
  //     const chart = new Chart(ctx, {
  //       // The type of chart we want to create
  //       type: 'line',

  //       // The data for our dataset
  //       data: {
  //         labels: labels,
  //         datasets: [{
  //           fill: false,
  //           borderColor: 'rgb(255, 99, 132)',
  //           data: phraseChars,
  //         }],
  //       },

  //       // Configuration options go here
  //       options: {
  //         elements: {
  //           line: {
  //             fill: false,
  //           },
  //         },
  //       },
  //     });
  //   });
  //   $('#myChart').show();
  // }

  // functions for study mode
  $('#show-translation').hide();
  $('#study-start').click(function() {
    // randomly pick a card from the vocab array
    const randomCard = vocab[Math.floor(Math.random()*vocab.length)];
    $('#show-translation').show();
    $('#collapseExample').collapse('hide');
    $('#study-card').empty();
    $('#random-phrase').text('');
    // print the contents of that card into the study-card body
    const par = $('<p>');
    par.text(randomCard.translation);
    $('#study-card').append(par);
    // button to show translation

    $('#randomPhrase').text(randomCard.orig_phrase);

    // button to show next card

    // button to exit
  });

  // delete route to remove a card
  $('.fa-trash-alt').click(function() {
    // eslint-disable-next-line no-invalid-this
    const delId = $(this).attr('data-id');

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
  $('#bank-filter').change(function() {
    // eslint-disable-next-line no-invalid-this
    if ($(this).val() !== 'Select Language') {
      const filtered = [];
      vocab.forEach((phrase)=> {
        if (phrase.language.lang === $('#bank-filter').val()) {
          filtered.push(phrase);
        }
      });
      console.log(filtered);
    }
  });
});
