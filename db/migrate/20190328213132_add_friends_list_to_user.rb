class AddFriendsListToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :friends_list, :text, array: true, default: []
  end
end
