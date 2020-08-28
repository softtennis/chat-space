$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html = 
        `<div class="main-chat__message1" data-message-id=${message.id}>
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
          `<div class="main-chat__message1" data-message-id=${message.id}>
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

  let reloadMessages = function() {
    let last_message_id = $('.main-chat__message1:last').data("message-id") || 0;
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages);
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});