import React, { Component } from 'react';
import { Route, NavLink, Link } from 'react-router-dom';
// import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import styles from './Blog.module.css';

class Blog extends Component {

    render() {
        let post = { ...this.props };
        console.log('post', post)
        return (
            <div className={styles.Blog}>
                <header>
                    <nav>
                        <ul>
                            {/* <li><a href='/'>Home</a></li>
                            <li><a href='/new-post'>New Post</a></li> */}
                            {/* this method prevent app from reloading */}
                            <li>
                                <NavLink to='/' exact activeClassName={styles.active}>Home</NavLink>
                            </li>
                            <li><NavLink activeClassName={styles.active}
                                to={{
                                    exact: true,
                                    pathname: '/new-post', // absolute path - added to domain only
                                    // pathname: this.props.match.url + '/new-post', // works if wrap Blog withRouter
                                    hash: '#submit',
                                    search: '?quick=true'
                                    // {...this.props}  // one way to pass Router props, should use withRouter
                                }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path='/' exact render={() => <h1>Home</h1>} /> */}
                {/* <Route path='/' exact render={() => <h1>Home2</h1>} /> */}
                {/* <Route path='/' exact render={() => <Posts />} />
                <Route path='/new-post' exact render={() => <NewPost />} /> */}
                <Route path='/' exact component={Posts} />
                <Route path='/new-post' exact component={NewPost} />

                {/* <Posts /> */}
                {/* <section>
                    <NewPost />
                </section> */}
            </div>
        );
    }
}

export default Blog;