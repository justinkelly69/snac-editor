import React, { useState } from 'react'
import { Display, Constants, XMLHeader, XMLBody } from '.'

const XMLDisplay = props => {
    const [mode, setMode] = useState(Constants.NO_SELECTION)
    const [newNS, setNewNS] = useState("")
    const [newName, setNewName] = useState("")
    let spacing = 0

    const Header = props.selectedNodes.length > 0 ? (
        <XMLHeader
            mode={mode}
            setMode={setMode}
            newNS={newNS}
            setNewNS={setNewNS}
            newName={newName}
            setNewName={setNewName}
            {...props}
        />
    ) : null

    const Body = (
        <XMLBody
            spacing={spacing}
            elements={props.selectedNodes}
            {...props}
        />
    )

    return (
        <Display Header={Header} Body={Body} {...props} />
    )
}

export default XMLDisplay