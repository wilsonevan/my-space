import React from 'react';
import { AuthConsumer, } from '../providers/AuthProvider';

import { Header, Form, Button, Segment, Select, } from 'semantic-ui-react';


class Register extends React.Component {
	state = { email: '', password: '', passwordConfirmation: '', name: '', nickname: '', id: null, }

	componentDidMount() {
		const { auth: { user, }} = this.props;
		// debugger
		if (user){
			this.setState({email: user.email, name: user.name, nickname: user.nickname, id: user.id, password: user.password, passwordConfirmation: '' })
		}
	}

	handleChange = (e, {name, value, }) => {
		this.setState({ [name]: value, });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { password, passwordConfirmation, } = this.state;
		const { auth: {handleRegister, handleUpdate, }, history, } = this.props;

		if (password === passwordConfirmation)
			if (this.state.id){
				handleUpdate(this.state, history);
			}else{
				handleRegister(this.state, history);
			}
		else
			alert("Passwords Don't Match!");

	}
	
	render() {
		const { email, password, passwordConfirmation, name, nickname, } = this.state;
		const { auth: { user, }} = this.props;

		return(
			<Segment basic >
				<Header as='h1' textAlign='center' >{user ? 'Edit Account' : 'Register New User' }</Header>	
				<Form onSubmit={this.handleSubmit}>
					<Form.Input 
						label='Name'
						autoFocus
						name='name'
						value={name}
						placeholder='Name'
						onChange={this.handleChange}
					/>
					<Form.Input 
						label='Username'
						name='nickname'
						value={nickname}
						placeholder='Username'
						onChange={this.handleChange}
					/>
					<Form.Input 
						label='Email'
						required
						name='email'
						value={email}
						placeholder='Email'
						onChange={this.handleChange}
					/>
					<Form.Input 
						label={user ? 'Old Password' : 'Password'}
						type='password'
						required
						name='password'
						value={password}
						placeholder='password'
						onChange={this.handleChange}
					/>
					<Form.Input 
						label={user ? 'Old Password Confirmation' : 'Password Confirmation'}
						type='password'
						required
						name='passwordConfirmation'
						value={passwordConfirmation}
						placeholder='Password Confirmation'
						onChange={this.handleChange}
					/>
					<Form.Field 
						control={Select}
						label='Avatar'
						options={options}
						placeholder='Avatars' 
					/>
					<Form.Button primary type='submit'>Submit</Form.Button>
				</Form>
			</Segment>
		)
	}
}

const options = [
	{ key: '1', text: '1', value: '<img src="http://lorempixel.com/400/300/people/1/"/>' },
	{ key: '2', text: '2', value: '<img src="http://lorempixel.com/400/300/people/2/"/>' },
	{ key: '3', text: '3', value: '<img src="http://lorempixel.com/400/300/people/3/"/>' },
	{ key: '4', text: '4', value: '<img src="http://lorempixel.com/400/300/people/4/"/>' },
	{ key: '5', text: '5', value: '<img src="http://lorempixel.com/400/300/people/5/"/>' },
	{ key: '6', text: '6', value: '<img src="http://lorempixel.com/400/300/people/6/"/>' },
	{ key: '7', text: '7', value: '<img src="http://lorempixel.com/400/300/people/7/"/>' },
	{ key: '8', text: '8', value: '<img src="http://lorempixel.com/400/300/people/8/"/>' },
	{ key: '9', text: '9', value: '<img src="http://lorempixel.com/400/300/people/9/"/>' },
	{ key: '10', text: '10', value: '<img src="http://lorempixel.com/400/300/people/10/"/>' },
]

const ConnectedRegister = (props) => (
	<AuthConsumer>
		{ auth => (
			<Register
				{ ...props }
				auth={ auth }
			/>
		)}
	</AuthConsumer>
)

export default ConnectedRegister;
