import React from 'react';

const createComponent = (className, tag = 'div', options) => props => {
    const props_ = {
        className: `${className}${className && props.className ? ' ' : ''}${props.className ? props.className : ''}`,
    };
    if (options && "onClick" in options && options.onClick) props_.onClick = options.onClick;
    return React.createElement(tag, props_, props.children);
};

export default createComponent;