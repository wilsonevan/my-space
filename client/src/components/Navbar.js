import React from 'react';
import { AuthConsumer, } from '../providers/AuthProvider';
import { Header, Menu, } from 'semantic-ui-react';
import { NavLink, } from 'react-router-dom'

class Navbar extends React.Component {

	rightNavItems = () => {
		const { auth: { user, handleLogout, }, history } = this.props;
		// debugger
		if (user) {
			return(
				<Menu.Menu position='right'>
					<Menu.Item>
						{ user.email }
					</Menu.Item>
					<Menu.Item onClick={() => handleLogout( history )}>
						Logout
					</Menu.Item>
				</Menu.Menu>
			)
		} else {	
			return(
				<Menu.Menu position='right'>
					<NavLink to='/login'>
						<Menu.Item>
							Login
						</Menu.Item>
					</NavLink>
					<NavLink to='/register'>
						<Menu.Item>
							Register
						</Menu.Item>
					</NavLink>
				</Menu.Menu>
			)
		}
	}

	render() {
		return(
			<Menu inverted color='orange' borderless >
				<NavLink to='/'>
					<Menu.Item>
						Home
					</Menu.Item>
				</NavLink>
				{this.rightNavItems()}
			</Menu>
		)
	}
}

const ConnectedNavbar = (props) => (
	<AuthConsumer>
		{ value => (
			<Navbar 
				{ ...props }
				auth={ value }
			/>
		)}
	</AuthConsumer>
)

export default ConnectedNavbar;