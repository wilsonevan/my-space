import React from 'react';
import axios from 'axios';
// import PostView from './PostView';
import PostForm from './PostForm';
import { Header, Feed, Icon, Segment,  } from 'semantic-ui-react';

class Home extends React.Component {
  state = { posts: [], users: [] }

  getPosts = () => {
    axios.get('/api/v1/posts')
    .then( res => {
      let sortedPosts = res.data
      function compare(a,b) {
        if (a.created_at < b.created_at)
          return 1;
        if (a.created_at > b.created_at)
          return -1;
        return 0;
      }
      
      sortedPosts = sortedPosts.sort(compare);

      this.setState( {posts: sortedPosts, users: this.state.users, }, )

    })

  }

  getUsers = () => {
    axios.get('/api/v1/users')
    .then( res => {
      this.setState( {posts: this.state.posts, users: res.data, }, )
    })
  }


  componentDidMount() {
    this.getPosts()
    this.getUsers()
  }

  fetchUserName = (userId) => {
    const userName = this.state.users.filter( user => user.id == userId );
    if (userName.length)
      return userName[0].nickname;
    else
      return "";
  }

  formatDate = (date) => {
    let d = new Date(date)
    return d.toLocaleString()
  }

  updateState = (post) => {
    let currentPosts = this.state.posts
    currentPosts.unshift(post)
    this.setState({ posts: currentPosts, users: this.state.users, })
  }

  render() {
    return(
      <>
      <Header as='h5' attached='top'>
        Create Post
      </Header>
      <Segment attached>
          <PostForm updateState={this.updateState}/>
      </Segment>
      <Feed>
        {this.state.posts.map( (post) => (
          <Feed.Event>
            <Feed.Label>
              <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                <Feed.User>{this.fetchUserName(post.id)}</Feed.User>
                <Feed.Date>{this.formatDate(post.created_at)}</Feed.Date>
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
      </>
    )
  }
}

export default Home;