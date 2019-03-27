
10.times do
	user = User.create(
		email: Faker::Internet.email,
		password: 'password',
		name: Faker::TvShows::ParksAndRec.character,
		nickname: Faker::Movies::LordOfTheRings.character,
	)

	10.times do
		Post.create(
			title: Faker::Quote.famous_last_words,
			content: Faker::Lorem.paragraph(3),
			user_id: user.id,
		)
	end
end

puts "Database seeded with 10 users and 10 posts each"