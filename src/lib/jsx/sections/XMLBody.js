import React from 'react'
import { ChildElements } from '..'

const XMLBody = props =>

    <ChildElements
        path={[]}
        spacing={props.spacing}
        elements={props.selectedNodes}
        prefixEnabled={false}
        showClosingTag={true}
        {...props}
    />

export default XMLBody