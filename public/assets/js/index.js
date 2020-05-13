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

  $('#translate-btn').click(function(event) {
    event.preventDefault();

    $.get('/api/user_data', async function(data) {
      const translation = {
        orig_phrase: $('#translation-input').val().trim(),
        from_id: 1,
        target_id: 2,
        lang_from: $('#translate-from').find('option:selected').attr('lang'),
        lang_to: $('#translate-to').find('option:selected').attr('lang'),
      };
      $('#translation-input').val('');

      $.ajax({
        method: 'POST',
        url: '/api/vocab',
        data: translation,
      }).then(()=> {
        location.reload();
      });
    });
  });
});
