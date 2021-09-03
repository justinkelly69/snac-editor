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
export default CDATAEditor