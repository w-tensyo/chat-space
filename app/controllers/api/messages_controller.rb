class Api::MessagesController < ApplicationController
  def index
    #ルーティングでの設定でひっぱってくるparams[:group_id]でグループidを判別
    #group_idに紐づいたグループのDBを取得
    group = Group.find(params[:group_id])
    #ajaxで送られてくる最後のメッセージのid番号を変数に入れる
    last_message_id = params[:id].to_i
    # 取得したグループのDBからwhereメソッドを使って対象のidがあるかどうかを判定
    # ここについては、idがlast_message_idよりも大きいものがあれば、それを@messagesに入れる処理をしている
    @messages = group.messages.includes(:user).where("id > ?", last_message_id)
  end
end