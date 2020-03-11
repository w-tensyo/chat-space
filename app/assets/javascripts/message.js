$(function(){
  function buildHTML(message){
    if (message.image){
      var html = 
        `<div class="msg">
          <div class="msg-info">
            <p class="msg-info__name">
              ${message.user_name}
            </p>
            <p class="msg-info__date">
              ${message.created_at}
            </p>
          </div>
          <div class="msg-info__text-image">
            <div class="msg-info__text-image__coment"></div>
            ${message.content}
            </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
        `<div class="msg">
          <div class="msg-info">
            <p class="msg-info__name">
              ${message.user_name}
            </p>
            <p class="msg-info__date">
              ${message.created_at}
            </p>
          </div>
          <div class="msg-info__text-image">
            <div class="msg-info__text-image__coment"></div>
              ${message.content}
            </div>
          </div>
        </div>`
      return html;
    };
  }

  $('.new_message').on('submit',function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url : url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-list').append(html);
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').attr('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').attr('disabled', false);
    });
  })
});