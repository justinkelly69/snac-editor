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
            setEdited={props.setEdited}
            {...props}
        />
    )

    const Body = (
        <PIBody
            body={body}
            setBody={setBody}
            setEdited={props.setEdited}
            {...props}
        />
    )

    return (
        <Display
            Header={Header}
            Body={Body}
            //selectMode={props.selectMode}
            //{...props}

            root={props.root}
            data={props.data}
            path={props.path}
            closingTags={props.closingTags}
            twoLines={props.twoLines}
            selectMode={props.selectMode}
            pathRow={props.pathRow}
            isSelectable={props.isSelectable}
            editor={props.editor}
            selectedNodes={props.selectedNodes}

            docProps={props.docProps}

            setTwoLines={props.setTwoLines}
            showClosingTags={props.showClosingTags}
            setSelectMode={props.setSelectMode}
            cutNodes={props.cutNodes}
            copyNodes={props.copyNodes}
            deleteNodes={props.deleteNodes}
            wrapNodes={props.wrapNodes}
            clearSelected={props.clearSelected}
            setEdited={props.setEdited}
            writeable={props.writeable}
            setSelectable={props.setSelectable}
            setEditor={props.setEditor}
            clearEditor={props.clearEditor}
            setSelected={props.setSelected}
            setPath={props.setPath}
        />
    )
}
export default PIEditor