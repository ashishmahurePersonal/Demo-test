import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { map } from 'lodash';
import { PostsAction, postsFetch } from '../actions';
import { MainState } from '../../index';
import { PostsState } from '../reducers';
import { PostItem } from './PostItem';
import { Message } from './Message';

interface StateProps {
    postsState: PostsState;
}

// Actions interface
interface DispatchProps {
    postsFetch: typeof postsFetch;
}

// Component interface
interface Props extends StateProps, DispatchProps {
}

class PostsList extends React.Component<Props, {}> {

    componentDidMount() {
        this.props.postsFetch();
    }

    render() {
        const {props} = this;
        const posts = props.postsState.posts;
        const location = props.postsState.location;

        // Posts are loading
        if (props.postsState.loading) {
            return <Message><span>⏳</span> Loading...</Message>;
        }

        // There's an error during fetching API
        else if (props.postsState.error) {
            return <Message>😫 Sorry, there's an error during fetching data</Message>;
        }

        // List unfiltered posts
        if (posts.length) {
            return map(posts, post => <PostItem key={post.id} post={post} location={location}/>);
        }

        return <Message><span>⏳</span> Loading...</Message>;
    }
}

const mapStateToProps = (state: MainState) => ({
    postsState: state.posts
});

const mapDispatchToProps = (dispatch: Dispatch<PostsAction>) => ({
    ...bindActionCreators({postsFetch}, dispatch)
});

// Connect mappers with component
export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
