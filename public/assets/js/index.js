$(document).ready(function() {
  // animation of the menu bars
  $('.second-button').on('click', function() {
    $('.animated-icon2').toggleClass('open');
  });

  // $('#translation-input').on('change', function() {
  //   if ($('#translation-input').val() === '') {
  //     $('#translate-btn').prop('disabled', true);
  //   } else {
  //     $('#translate-btn').prop('disabled', false);
  //   };
  // });

  $('#translate-btn').click(function(event) {
    event.preventDefault();
    $('#translate-from').attr('lang'),

    $.get('/api/user_data', async function(data) {
      const id = await data.id;
      const translation = {
        eng_phrase: $('#translation-input').val().trim(),
        translation: $('#translation-input').val().trim(),
        from_id: 1,
        target_id: 2,
        user_id: id,
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
