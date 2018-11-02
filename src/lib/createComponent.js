import React from 'react';

const createComponent = (className, tag = 'div', options) => props => {
    const props_ = {
        className: `${className}${className && props.className ? ' ' : ''}${props.className ? props.className : ''}`,
    };

    if (options && typeof options === 'object') {
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                props_[key] = options[key];
            }
        }
    }
    return React.createElement(tag, props_, props.children);
};

export default createComponent;