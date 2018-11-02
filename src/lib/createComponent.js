import React from 'react';

const createComponent = (className, tag = 'div', options) => props => {
    const props_ = {
        className: `${className}${className && props.className ? ' ' : ''}${props.className ? props.className : ''}`,
    };
    if (options) {
        if ("onClick" in options && options.onClick) props_.onClick = options.onClick;
        if ("onSubmit" in options && options.onSubmit) props_.onSubmit = options.onSubmit;
    }
    return React.createElement(tag, props_, props.children);
};

export default createComponent;