import React, { useState } from 'react'
import { Display, PIHeader, PIBody } from '.'

const PIEditor = props => {
    const [lang, setLang] = useState(props.data.L)
    const [body, setBody] = useState(props.data.B)

    const Header = (
        <PIHeader
            canEdit={true}
            lang={lang}
            body={body}
            setLang={setLang}
            unwrapNode={props.unwrapNode}
            {...props}
        />
    )

    const Body = (
        <PIBody
            body={body}
            setBody={setBody}
            {...props}
        />
    )

    return (
        <Display
            Header={Header}
            Body={Body}
            selectMode={props.selectMode}
            {...props}
        />
    )
}
export default PIEditor