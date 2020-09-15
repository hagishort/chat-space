$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="chatbox" data-message-id=${message.id}>
         <div class="chat-main__box">
           <div class="chat-main__name">
             <div class="chat-main__messagename">
               ${message.user_name}
             </div>
             <div class="chat-main__day">
               ${message.created_at}
             </div>
           </div>
           <div class="chat-main__comment">
             <p class="chat-main__content">
               ${message.content}
             </p>
             <img class="chat-main__image" src="${message.image}">
           </div>
        </div>`
    return html;
  } else {
      let html =
      `<div class="chatbox" data-message-id=${message.id}>
         <div class="chat-main__box">
            <div class="chat-main__name">
              <div class="chat-main__messagename">
                ${message.user_name}
              </div>
              <div class="chat-main__day">
                ${message.created_at}
              </div>
            </div>
            <div class="chat-main__comment">
              <p class="chat-main__content">
                ${message.content}
              </p>
            </div>
         </div>`
    return html;
  };
  }
 
  let reloadMessages = function() {
    let last_message_id = $('.chatbox:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
})