import React from 'react';
import { Form, } from 'semantic-ui-react';
import axios from 'axios';
import { AuthConsumer, } from '../providers/AuthProvider';
// import { FoodConsumer } from '../providers/FoodProvider';

class PostForm extends React.Component {
	state = {
		content: '',
	}
	
	handleChange = (e, {name, value}) => this.setState({ [name]: value, })

	handleSubmit = (e) => {
		e.preventDefault();
		const id = this.props.auth.user.id;
		const post = { ...this.state, user_id: id, };
		axios.post('/api/v1/posts', post )
			.then( res => {
				this.props.updateState( res.data )
				this.setState( { content: '', } )
			})
			.catch( res => {
				console.log(res.err);
			})
	}

	render() {
		const { title, content, } = this.state

		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.TextArea
					placeholder='What do you want to say...' 
					type='text'
					name='content'
					value={content}
					onChange={this.handleChange}
				/>
				<Form.Button color='orange'>Share</Form.Button>
			</Form>
		)
	}
}

const ConnectedPostForm = (props) => (
	<AuthConsumer>
		{ auth => (
			<PostForm
				{ ...props } 
				auth={ auth } 
			/>
		)}
	</AuthConsumer>
)

export default ConnectedPostForm;