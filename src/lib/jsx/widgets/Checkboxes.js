import React from 'react'

export const Checkbox = props =>
    <span className="checkbox-label">
        <input type="checkbox"
            id={props.id}
            className="checkbox"
            disabled={props.disabled}
            checked={props.checked}
            onChange={props.onChange}
        />
        <label for={props.id}>
            {props.checked ? props.labelOn : props.labelOff}
        </label>
    </span>
