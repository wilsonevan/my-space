import React from 'react';
import axios from 'axios';

const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends React.Component {
	state = { user: null, }

	handleRegister = (user, history, ) => {
		axios.post('/api/auth', user, )
			.then( res => {
				this.setState({ user: res.data, });
			})
			history.push('/');
	}

	handleLogin = () => {
		debugger
	}

	handleLogout = () => {
		debugger
	}
	
	render() {
		return(
			<AuthContext.Provider value={{
				...this.state,
				authenticated: this.state.user !== null,
				handleRegister: this.handleRegister,
				handleLogin: this.handleLogin,
				handleLogout: this.handleLogout,
			}} >
				{ this.props.children }
			</AuthContext.Provider>
		)
	}
}