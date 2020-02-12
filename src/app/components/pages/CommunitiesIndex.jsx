import React from 'react';
import { connect } from 'react-redux';
import tt from 'counterpart';
import { Map, List } from 'immutable';
import { actions as fetchDataSagaActions } from 'app/redux/FetchDataSaga';
import SubscribeButton from 'app/components/elements/SubscribeButton';
import { Link } from 'react-router';
import PostsIndexLayout from 'app/components/pages/PostsIndexLayout';
import LoadingIndicator from 'app/components/elements/LoadingIndicator';
import UserNames from 'app/components/elements/UserNames';

export default class CommunitiesIndex extends React.Component {
    componentWillMount = () => {
        this.props.listCommunities(this.props.username);
    };
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.username !== this.props.username) {
            this.props.listCommunities(this.props.username);
        }
    };

    render() {
        const {
            communities,
            communities_idx,
            username,
            walletUrl,
        } = this.props;
        const ordered = communities_idx.map(name => communities.get(name));

        if (communities_idx.size === 0) {
            return (
                <center>
                    <LoadingIndicator
                        style={{ marginBottom: '2rem' }}
                        type="circle"
                    />
                </center>
            );
        }

        const role = comm =>
            comm.context &&
            comm.context.role !== 'guest' && (
                <span className="user_role">{comm.context.role}</span>
            );

        const communityAdmins = admins => {
            if (!admins || admins.length === 0) return;

            return (
                <div>
                    {admins.length === 1
                        ? `${tt('g.administrator')}: `
                        : `${tt('g.administrators')}: `}
                    <UserNames names={admins} />
                </div>
            );
        };

        const row = comm => {
            const admins = communityAdmins(comm.admins);
            return (
                <tr key={comm.name}>
                    <th>
                        <Link className="title" to={`/trending/${comm.name}`}>
                            {comm.title}
                        </Link>
                        {role(comm)}
                        <br />
                        {comm.about}
                        <small>
                            {comm.subscribers} subscribers &bull;{' '}
                            {comm.num_authors} posters &bull; {comm.num_pending}{' '}
                            posts
                            {admins}
                        </small>
                    </th>
                    <td>
                        <SubscribeButton community={comm.name} />
                    </td>
                </tr>
            );
        };

        return (
            <PostsIndexLayout
                category={null}
                enableAds={false}
                blogmode={false}
            >
                <div className="CommunitiesIndex c-sidebar__module">
                    {username && (
                        <div style={{ float: 'right' }}>
                            <a href={`${walletUrl}/@${username}/communities`}>
                                Create a Community
                            </a>
                        </div>
                    )}
                    <h4>
                        {/* {<Link to={`/`}>Home</Link>} &gt;{' '} */}
                        {tt('g.community_list_header')}
                    </h4>
                    <hr />
                    <table>
                        <tbody>{ordered.map(comm => row(comm.toJS()))}</tbody>
                    </table>
                </div>
            </PostsIndexLayout>
        );
    }
}

module.exports = {
    path: 'communities(/:username)',
    component: connect(
        state => {
            return {
                walletUrl: state.app.get('walletUrl'),
                username: state.user.getIn(['current', 'username']),
                communities: state.global.get('community', Map()),
                communities_idx: state.global.get('community_idx', List()),
            };
        },
        dispatch => {
            return {
                listCommunities: observer => {
                    dispatch(
                        fetchDataSagaActions.listCommunities({ observer })
                    );
                },
            };
        }
    )(CommunitiesIndex),
};
