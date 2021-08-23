import React from 'react'
import { ChildElements } from '..'

const XMLBody = props =>

    <ChildElements
        path={[]}
        spacing={props.spacing}
        elements={props.selectedNodes}
        prefixEnabled={false}
        showClosingTag={true}
        writeable={props.writeable}
        {...props}
    />

export default XMLBody