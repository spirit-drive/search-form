import React from 'react';

const createComponent = (className, tag = 'div') => props => (
    React.createElement(
        tag,
        {
            className: `${className}${className && props.className ? ' ' : ''}${props.className ? props.className : ''}`
        },
        props.children
    )
);

export default createComponent;