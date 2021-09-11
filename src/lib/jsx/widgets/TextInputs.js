import React from 'react'

export const TextInput = props =>
    <input type="text"
        id={props.id}
        name={props.name}
        className={props.className}
        value={props.value}
        onClick={props.onClick}
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
    />

export const NSInput = props =>
    <TextInput className="ns-input" {...props} />

export const NameInput = props =>
    <TextInput className="name-input" {...props} />

export const AttNSInput = props =>
    <TextInput className="att-ns-input" {...props} />

export const AttNameInput = props =>
    <TextInput className="att-name-input" {...props} />

export const AttValueInput = props =>
    <TextInput className="att-value-input" {...props} />

export const PILangInput = props =>
    <TextInput className="pi-lang-input" {...props} />
