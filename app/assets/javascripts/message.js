$(function(){

  var buildHTML = function(message) {
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = `<div class="msg" data-message-id="${message.id}">
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
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html =`<div class="msg" data-message-id="${message.id}">
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
                </div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="msg" data-message-id="${message.id}">
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
                    </div>
                    <img src=${message.image} >
                  </div>`
    };
    return html;
  };


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
  });

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.msg:last').data("message-id");
    $.ajax({ 
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
        if (messages.length !== 0) {
          //追加するHTMLの入れ物を作る
          var insertHTML = '';
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          //メッセージが入ったHTMLに、入れ物ごと追加
          //対象divの大元"message-listに実装を修正
          $('.message-list').append(insertHTML);
          $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
        }
      })
      .fail(function(){
        alert('error');
      });
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
});
