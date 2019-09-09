import React, { Component } from 'react';
import instance from '../../../axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import styles from './Posts.module.css';
import { Route, withRouter}  from 'react-router-dom';

class Posts extends Component {

    state = {
        posts: [],
        // selectedPostId: null,
        // error: false,
    };

    // componentDidMount is recommended LC hook to use for API's
    componentDidMount() {
        console.log(this.props);
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
                // this.setState({ error: true });
            });
    };


    postSelectedHandler = (id) => {
        // use line below when using Link to wrap the Post in the render
        // this.setState({ selectedPostId: id })

        // push new page into stack of pages - used when Link not used in the render
        // either way below works
        // this.props.history.push({
        //     pathname: '/posts/' + id
        // });
        console.log('postSelectedHandler: ', id)
        this.props.history.push('/posts/' + id);
    };

    render() {

        // message based on error state
        let posts = this.state.error
            ? <p style={{ textAlign: 'center' }}>ERROR - Somthing went wrong</p>
            :
            // build array of JSX to be rendered
            // Link makes the box a react link. key is required on outer element    
            // a=1&b=2 added just to test/example for URLSearchParams in FullPost.js
            // hashtest is also an example
            // below is 3 different ways of doing the same thing 
            // onr does not use Link, but the clicked method (postSelectdHandler)
            this.state.posts.map((post) => {
                return (
                // <Link to={{
                //     pathname: '/posts' + post.id + '?a=1&b=2',
                //     hash: 'hashtest'
                // // return (<Link to={
                // //     '/' + post.id + '?a=1&b=2#hashtest'
                // }} key={post.id} >
                    <Post
                        // key={post.id}
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                // {/* </Link> */}
                );
            });

        return (
            <div>
                <section className={styles.Posts}>
                    {posts}
                </section>
                {/* this is one way to get FullPost w/out using a link URL and on same page as the posts list */}
                {/* <section>
                    <FullPost id={this.state.selectedPostId} />
                </section> */}
                {/* nested Route */}
                <Route path={this.props.match.url + '/:postId'} exact component={FullPost} />
                {/* <Route path='/:postId' exact component={FullPost} /> */}
            </div>
        )
    };
};


export default withRouter(Posts);