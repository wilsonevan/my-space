class Post < ApplicationRecord
	belongs_to :user

	serialize :liked_posts, Array

	def self.liked(ids)
		ids = ids.empty? ? [0] : ids
		Post.where("id IN (?)", ids)
	end

end
