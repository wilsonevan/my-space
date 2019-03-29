import React from 'react';
import axios from 'axios';
import { AuthConsumer, } from '../providers/AuthProvider';
// import PostView from './PostView';
import { NavLink, } from 'react-router-dom'
import { Header, Icon, Item,  } from 'semantic-ui-react';

class FindFriends extends React.Component {
  state = { users: [], friends: [], }

  getUsers = () => {
    axios.get('/api/v1/users')
    .then( res => {
      this.setState( {users: res.data, friends: this.state.friends, }, )
    })
  }

  getFriends = () => {
    // const currentUser = this.props.auth.user;
    axios.get('/api/v1/my_friends')
    .then( res => {
      debugger
      this.setState( {users: this.state.users, friends: res.data, }, )
    })
  }

  componentDidMount() {

    this.getUsers()
    this.getFriends()
    // let currentPosts = this.state.posts
    // let currentUsers = this.state.users

  }

  isFriend = (userId) => {
    // TODO Loop through and check whether userId is in the current user's friends list
    const friend = this.state.friends.filter( friend => friend.id == userId );
    // debugger
    if (friend.length)
      return true;
    else
      return false;
    // If it is, return true
    // Else, return false
    // return false
  }

  addFriend = (friendId) => {
    // debugger
    // TODO add to user's friendslist

    const currentUser = this.props.auth.user;
    
    axios.post('/api/v1/add_friend', { ...currentUser, friendId: friendId, } )
    .then( res => {
        debugger
        this.setState({ users: this.state.users, friends: res.data, })
      })
  }

  render() {
    return(
      <>
        <Header as='h1'>Find Friends</Header>
        <Item.Group>
          {this.state.users.map( user => (
            <Item>
              <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
              <Item.Content verticalAlign='middle'>
                <Item.Header>
                  <Icon link onClick={() => this.addFriend(user.id)} name={this.isFriend(user.id) ? 'heart' : 'heart outline' } />
                  {user.name}
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </>
    )
  }
}

const ConnectedFindFriends = (props) => (
	<AuthConsumer>
		{ auth => (
			<FindFriends
				{ ...props }
				auth={ auth }
			/>
		)}
	</AuthConsumer>
)

export default ConnectedFindFriends;