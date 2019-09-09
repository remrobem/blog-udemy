import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null,
    };

    // use DidMount when using link to the full post
    // componentDidUpdate() {
// this runs one time when mounted. (if another post is selected, then componentWillUpdate is called)
    componentDidMount() {
        // // example of getting additonal parameters from the URL
        // console.log('search: ', this.props.location.search)
        // let query = new URLSearchParams(this.props.location.search);
        // for (let param of query.entries()) {
        //     console.log('param: ', param); // yields ['start', '5']
        // };


        // // url parameters sent in props.match.params
        // let postId = this.props.match.params.postId;
        // // only get if have id and either no post loaded or loaded post not equal to new selected post
        // if (postId) {
        //     if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== postId)) {
        //         axios.get('/posts/' + postId)
        //             .then(response => {
        //                 this.setState({ loadedPost: response.data })
        //             });
        //     }
        // };
        // only get if have id and either no post loaded or loaded post not equal to new selected post
        // if (this.props.id) {
        //     if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
        //         axios.get('/posts/' + this.props.id)
        //             .then(response => {
        //                 this.setState({ loadedPost: response.data })
        //             });
        //     }
        // };

        this.loadData();
    };


    loadData() {
        // url parameters sent in props.match.params
        let postId = this.props.match.params.postId;
        // only get if have id and either no post loaded or loaded post not equal to new selected post
        if (postId) {
            // be careful - this.state.loadedPost.id != postId are different data type so == will not work - infinite loop
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id != postId)) {
                axios.get('/posts/' + postId)
                    .then(response => {
                        this.setState({ loadedPost: response.data })
                    });
            }
        };
    };

    // when post box selected and using nested Route
    // props changed, so need to get new post
    componentDidUpdate() {
        this.loadData();
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.state.loadedPost.id)
            .then((response) => {
                console.log(response)
            });
    };

    render() {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;

        if (this.props.match.params.postId) {
            post = <p style={{ textAlign: 'center' }}>Loading!</p>;
        };

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>

            );
        }

        return post;
    }
}

export default FullPost;