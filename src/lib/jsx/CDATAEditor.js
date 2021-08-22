import React, { useState } from 'react'
import { Display, CDATAHeader, CDATABody } from '.'

const CDATAEditor = props => {
    const [cdata, setCDATA] = useState(props.data.D)

    const Header =
        <CDATAHeader
            canEdit={true}
            cdata={cdata}
            unwrapNode={props.unwrapNode}
            setEdited={props.setEdited}
            {...props}
        />

    const Body =
        <CDATABody
            cdata={cdata}
            setCDATA={setCDATA}
            setEdited={props.setEdited}
        />

    return (
        <Display
            Header={Header}
            Body={Body}
            selectMode={props.selectMode}
            {...props}
        />
    )
}
export default CDATAEditor