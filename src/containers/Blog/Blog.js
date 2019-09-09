import React, { Component, Suspense } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
// import './Blog.css';
import styles from './Blog.module.css';
// import Posts from './Posts/Posts';

// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});
// lazy load with Suspense
const Posts = React.lazy(() => {
    return import('./Posts/Posts');
})

class Blog extends Component {

    state = {
        auth: true,
    }
    render() {
        let post = { ...this.props };
        console.log('post', post)
        return (
            <div className={styles.Blog}>
                {/* <p>{React.version}</p> */}
                <header>
                    <nav>
                        <ul>
                            {/* <li><a href='/'>Home</a></li>
                            <li><a href='/new-post'>New Post</a></li> */}
                            {/* this method prevent app from reloading */}
                            <li>
                                <NavLink to='/posts/' exact activeClassName={styles.active}>Post</NavLink>
                            </li>
                            <li>{this.state.auth ?
                                <NavLink activeClassName={styles.active}
                                    to={{
                                        exact: true,
                                        pathname: '/new-post', // absolute path - added to domain only
                                        // pathname: this.props.match.url + '/new-post', // works if wrap Blog withRouter
                                        hash: '#submit',
                                        search: '?quick=true'
                                        // {...this.props}  // one way to pass Router props, should use withRouter
                                    }}>New Post</NavLink>
                                : 'New Post'}</li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path='/' exact render={() => <h1>Home</h1>} /> */}
                {/* <Route path='/' exact render={() => <h1>Home2</h1>} /> */}
                {/* <Route path='/' exact render={() => <Posts />} />
                <Route path='/new-post' exact render={() => <NewPost />} /> */}
                {/* Switch forces only one Route to be used */}
                {/* sequence of Routes matter - variables can return path directories */}
                <Switch>
                    {/* check if auth before render post - called a guard */}
                    {/* // lazy loading/code splitting */}
                    {this.state.auth ? <Route path='/new-post' exact component={AsyncNewPost} /> : null}
                    {/* <Route path='/' exact component={Posts} /> */}
                    {/* remove exact when using nested route (as in Posts.js) */}

                    {/* lazy load using suspense */}
                    {/* <Route path='/posts/' component={Posts} /> */}
                    <Route
                        path='/posts/'
                        render={() => (
                            <Suspense fallback={<div>...Loading</div>}>
                                <Posts {...this.props} />
                            </Suspense>
                        )}
                    />
                    {/* <Route path='/:postId' exact component={FullPost} /> */}
                    {/* no path parameter handles ny route not already handled */}
                    {/* this is not good example with from='/' path following this */}
                    <Route render={() => <h1>Not Found</h1>} />
                    <Redirect from='/' to='/posts' />
                </Switch>

                {/* <Posts /> */}
                {/* <section>
                    <NewPost />
                </section> */}
            </div>
        );
    }
}

export default Blog;