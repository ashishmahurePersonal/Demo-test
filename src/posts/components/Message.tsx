import * as React from 'react';
import './Message.css';

export const Message: React.SFC = props => {
    return (
        <p className="message">{props.children}</p>
    );
};
