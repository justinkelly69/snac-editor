import React from 'react'
import { Display, XMLBody } from '.'

const XMLDisplay = props => {

    const spacing = 0



    const Body = (
        <XMLBody
            spacing={spacing}
            elements={props.selectedNodes}
            setSelectable={props.setSelectable}
            isSelectable={props.isSelectable}
            writeable={false}
            {...props}
        />
    )

    return (
        <Display Header={null} Body={Body} {...props} />
    )
}

export default XMLDisplay