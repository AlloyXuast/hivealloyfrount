import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from './Icon';
import HelpTip from './HelpTip';

class Blacklist extends Component {
    render() {
        const { blacklist, author, coalStatus } = this.props; // redux

        if (coalStatus === 'enabled') {
            const blacklisted = blacklist.get(author);
            if (blacklisted !== undefined) {
                const description = (
                    <p>
                        <strong>Reason Code: </strong>
                        {blacklisted.reason}
                        <br />
                        <strong>Notes: </strong>
                        {blacklisted.notes}
                        <br />
                        If you believe this to be an error, please contact us in #appeals channel in the
                        {' '}
                        <a href="https://discord.blurt.world">Blurt Discord server</a>
                        .
                    </p>
                );
                return (
                    <HelpTip content={description}>
                        <Icon name="alert" />
                    </HelpTip>
                );
            }
        }
        return null;
    }
}

// eslint-disable-next-line no-unused-vars
export default connect((state, ownProps) => {
    const userPreferences = state.app.get('user_preferences').toJS();
    const coalStatus = userPreferences.coalStatus || 'enabled';
    const blacklist = state.global.getIn(['blacklist']) == undefined
            ? undefined
            : state.global.getIn(['blacklist']);
    return {
        blacklist,
        coalStatus,
    };
})(Blacklist);