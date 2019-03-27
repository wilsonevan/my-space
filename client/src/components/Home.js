import React from 'react';
import axios from 'axios';
import { Header, Feed, Icon,  } from 'semantic-ui-react';

class Home extends React.Component {
  state = { posts: [], users: [] }

  componentDidMount() {
    axios.get('/api/v1/posts')
      .then( res => {
        this.setState({ posts: res.data, })
      })
  }

  // showPosts() {
  //   return(
     
  //   )
  // }

  render() {
    return(
      <Feed>
        {this.state.posts.map( (post) => (
          <Feed.Event>
            <Feed.Label>
              <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                {/* <Feed.User>{post.title}</Feed.User> */}
                <Feed.Date>{post.created_at}</Feed.Date>
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
          ))
        }
      </Feed>
    )
  }
}

export default Home;