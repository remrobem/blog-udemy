import React, { Component } from 'react';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
// import axios from 'axios';
import instance from '../../../src/axios';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false,
    }

    // componentDidMount is recommended LC hook to use for API's
    componentDidMount() {
        instance.get('/posts')
            .then(response => {
                // console.log('get response: ', response);
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map((post) => {
                    return {
                        ...post,
                        author: 'hard-coded'
                    };
                });
                this.setState({ posts: updatedPosts });
            })
            .catch(error => {
                console.log('error: ', error);
                this.setState({ error: true });
            });
    };

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id })
    }

    render() {
        // message based on error state
        let posts = this.state.error 
        ? <p style={{textAlign: 'center'}}>ERROR - Somthing went wrong</p>
        :
        // build array of JSX to be rendered
         this.state.posts.map((post) => {
            return <Post
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)} />
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;