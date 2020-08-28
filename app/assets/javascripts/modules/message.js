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
  };
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
      $('.Form__submit').prop("disabled", false);
    });
  });
});
//   let reloadMessages = function() {
//     let last_message_id = $('.MessageBox:last').data("message-id") || 0;
//     $.ajax({
//       url: "api/messages",
//       type: 'get',
//       dataType: 'json',
//       data: {id: last_message_id}
//     })
//     .done(function(messages) {
//       if (messages.length !== 0) {
//         let insertHTML = '';
//         $.each(messages, function(i, message) {
//           insertHTML += buildHTML(message)
//         });
//         $('.MessageField').append(insertHTML);
//         $('.MessageField').animate({ scrollTop: $('.MessageField')[0].scrollHeight});})
//       }
//     })
//     .fail(function() {
//       alert('error');
//     });
//   };
//   setInterval(reloadMessages, 7000);
// });