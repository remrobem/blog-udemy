import React, { Component } from 'react';
import axios from 'axios';
import './NewPost.css';
 import { Redirect } from 'react-router-dom';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false,
    };

    componentDidMount() {
        console.log(this.props);
    };

    postHandler = () => {

        const post = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author
        };

        axios.post('/posts', post)
            .then((response) => {
                console.log(response);
                // this is another way to redirect - goes back to posts after post created
                // setState not needed - left so the redirect in the render works
                this.props.history.push('/posts');
                this.setState({ submitted: true})
            });
    };

    // redirect back to posts after new post created
    render() {
        // this is one way to redirect - better way is the history.push in 
        // the axios post
        let redirect = null;
        if (this.state.submitted) {
            redirect = ( <Redirect to='/posts' /> );
        }

        return (
            <div className="NewPost">
                { redirect }
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;