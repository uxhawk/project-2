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

  let langFrom;
  let langTo;
  $('select.ibm-lang').change(function() {
    langFrom = $('#translate-from').find('option:selected').attr('lang');
    langTo = $('#translate-to').find('option:selected').attr('lang');
    console.log(langFrom, langTo);
  });

  $('#translate-btn').click(function(event) {
    event.preventDefault();
    console.log($('#translate-from').attr('lang'));

    $.get('/api/user_data', async function(data) {
      const id = await data.id;
      const translation = {
        eng_phrase: $('#translation-input').val().trim(),
        translation: $('#translation-input').val().trim(),
        from_id: 1,
        target_id: 2,
        user_id: id,
        lang_from: langFrom,
        lang_to: langTo,
      };
      // console.log(translation);
      $('#translation-input').val('');

      $.ajax({
        method: 'POST',
        url: '/api/vocab',
        data: translation,
      });
    });
  });
});
