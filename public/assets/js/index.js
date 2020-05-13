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
});
