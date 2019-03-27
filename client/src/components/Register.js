import React from 'react';
import { AuthConsumer, } from '../providers/AuthProvider';

import { Header, Form, Button, Segment, } from 'semantic-ui-react';


class Register extends React.Component {
	state = { email: '', password: '', passwordConfirmation: '', name: '', nickname: '', }

	handleChange = (e, {name, value, }) => {
		this.setState({ [name]: value, });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { password, passwordConfirmation, } = this.state;
		const { auth: {handleRegister, }, history, } = this.props;

		if (password === passwordConfirmation)
			handleRegister(this.state, history);
		else
			alert("Passwords Don't Match!");

	}
	
	render() {
		const { email, password, passwordConfirmation, name, nickname, } = this.state;

		return(
			<Segment basic >
				<Header as='h1' textAlign='center' >Register</Header>	
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
						label='Password'
						type='password'
						required
						name='password'
						value={password}
						placeholder='password'
						onChange={this.handleChange}
					/>
					<Form.Input 
						label='Password Confirmation'
						type='password'
						required
						name='passwordConfirmation'
						value={passwordConfirmation}
						placeholder='Password Confirmation'
						onChange={this.handleChange}
					/>
					<Form.Button primary type='submit'>Submit</Form.Button>
				</Form>
			</Segment>
		)
	}
}

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
