$(document).ready(function() {
  // animation of the menu bars
  $('.second-button').on('click', function() {
    $('.animated-icon2').toggleClass('open');
  });

  $('#translate-btn').click(function(event) {
    event.preventDefault();
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
