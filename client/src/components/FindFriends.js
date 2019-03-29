import React from 'react';
import axios from 'axios';
import { AuthConsumer, } from '../providers/AuthProvider';
// import PostView from './PostView';
import { NavLink, } from 'react-router-dom'
import { Header, Icon, Item,  } from 'semantic-ui-react';

class FindFriends extends React.Component {
  state = { users: [], friends: [], user: {} }

  getUsers = () => {
    axios.get('/api/v1/users')
    .then( res => {
      this.setState( {users: res.data, friends: this.state.friends, user: this.state.user, }, )
    })
  }

  getFriends = () => {
    // const currentUser = this.props.auth.user;
    // axios.get('/api/v1/my_friends')
    // .then( res => {
    //   this.setState( {users: this.state.users, friends: res.data, user: this.state.user, }, )
    // })

    // const { auth: { user }, } = this.props;
    // this.setState({user})

  }

  componentDidMount() {

    // Set the User from AUTH
    this.setState({user: this.props.auth.user, users: this.state.users, friends: this.props.auth.user.friends_list, } )

    // Get friend data
    this.getUsers()
    // this.getFriends()
  }

  isFriend = (userId) => {
    const friend = this.state.friends.filter( friend => friend == userId );
    console.log(friend)

    if (friend.length)
      return true;
    else
      return false;
  }

  addFriend = (friendId) => {
    // TODO only add if not already in list
    // TODO remove from friendslist if already in it
    
    const { auth: { handleUpdate, user }, history, } = this.props;

    // Already in the list, so REMOVE from list
    if ( this.isFriend(friendId) ) {
      // debugger
      axios.post('/api/v1/remove_friend', { ...user, friendId: friendId, } )
        .then( res => {
          // debugger
          this.setState({ users: this.state.users, friends: res.data.friends_list, user: this.state.user, })
        })
    } 
    
    else { // Not in friend list, so ADD to list
      // debugger
      axios.post('/api/v1/add_friend', { ...user, friendId: friendId, } )
        .then( res => {
          // debugger
          this.setState({ users: this.state.users, friends: res.data.friends_list, user: this.state.user, })
        })
    }
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