import React from 'react';
import { Header, Feed, Icon,  } from 'semantic-ui-react';

const PostView = ({ post, }) => {
	const fetchUserName = (userId) => {
    const userName = this.state.users.filter( user => user.id == userId );
    // debugger
    if (userName.length)
      return userName[0].nickname;
    else
      return "";
  }

  const formatDate = (date) => {
    let d = new Date(date)
    // debugger
    return d.toLocaleString()
	}
	
	return(
		<Feed.Event>
			<Feed.Label>
				<img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
			</Feed.Label>
			<Feed.Content>
				<Feed.Summary>
					<Feed.User>{fetchUserName(post.id)}</Feed.User>
					<Feed.Date>{formatDate(post.created_at)}</Feed.Date>
				</Feed.Summary>
				<Feed.Extra text>
					{post.content}
				</Feed.Extra>
				{/* <Feed.Meta>
					<Feed.Like>
						<Icon name='like' />
						4 Likes
					</Feed.Like>
				</Feed.Meta> */}
			</Feed.Content>
		</Feed.Event>
	)
}

export default PostView;