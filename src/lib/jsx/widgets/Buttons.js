import React from 'react'

export const Button = props =>
    <button
        className={props.className}
        disabled={props.disabled}
        tabIndex={props.tabIndex}
        onClick={props.onClick}
    >
        {props.label}
    </button>

export const StandardButton = props => <Button className="button button-standard" {...props} />
export const CDATAButton =  props => <Button className="button button-cdata" {...props} />
export const CommentButton =  props => <Button className="button button-comment" {...props} />
export const PIButton =  props => <Button className="button button-pi" {...props} />
export const AttributesButton =  props => <Button className="button button-attributes" {...props} />
export const ChildrenButton =  props => <Button className="button button-children" {...props} />
export const TextButton =  props => <Button className="button button-text" {...props} />

export const SelectXML =  props => <Button className="button-select" {...props} />