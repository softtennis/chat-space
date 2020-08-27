$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html = 
        `<div class="main-chat__message1">
            <span class="user">
              ${message.user_name}
            </span>
            <span class="date">
              ${message.created_at}
            </span>
            <div class="main-chat__message2">
              <p class="main-chat__message2-content">
                ${message.content}
              </p>
              <img class="main-chat__message2-image" src="${message.image}">
            </div>
          </div>`
      return html;
    } else {
      let html =
          `<div class="main-chat__message1">
          <span class="user">
            ${message.user_name}
          </span>
          <span class="date">
            ${message.created_at}
          </span>
          <div class="main-chat__message2">
            <p class="main-chat__message2-content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  $('.main-chat__message-form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = buildHTML(message)
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('.main-chat__message-form')[0].reset();
      $('.main-chat__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});