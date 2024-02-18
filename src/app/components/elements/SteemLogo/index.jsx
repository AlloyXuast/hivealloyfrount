import React from 'react';
import PropTypes from 'prop-types';

const SteemLogo = ({ nightmodeEnabled }) => {
    const logo = nightmodeEnabled ? '/images/hive-alloy-logo-nightmode.gif' : '/images/hive-alloy-logo.gif';

    return (
        <span className="logo">
            <img 
                alt="logo" 
                width="150" 
                height="40" 
                src={logo}
           />
        </span>
    );
};

export default SteemLogo;
