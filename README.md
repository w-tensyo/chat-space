# README

# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|emails|string|null: false|
|password|string|null: false|
|username|string|null: false|
|group_id|integer|null: false, foreign_key: true|
### Association
- has_many :messages
- has_many :groups, through: :users_groups
- has_many :users_groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, unique: ture|
|user_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|
### Association
- has_many :messages
- has_many :users, through: :users_groups
- has_many :users_groups

## messagesグループ
|Column|Type|Options|
|------|----|-------|
|body|string|null: false|
|image|string|null: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belong_to :user
- belong_to :group

## users_groupsグループ（中間テーブル）
|Column|Type|Options|
|------|----|-------|
|users_id|integer|null: false, foreign_key: true|
|messages_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group