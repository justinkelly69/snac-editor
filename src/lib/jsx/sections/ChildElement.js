import React from 'react'
import { SNAC, NodeElement, TextElement, CDATAElement, CommentElement, PIElement } from '..'
//import * as SNAC from 'snac'

const ChildElement = props => {
    const Child = {
        'N': NodeElement,
        'T': TextElement,
        'D': CDATAElement,
        'M': CommentElement,
        'P': PIElement,
    }[props.type] || null

    const prefix = [...props.prefix, SNAC.getPrefixItem(props.type, props.index, props.data)]
    const prefixArray = SNAC.getPrefixArray(prefix, props.prefixEnabled)
    const spacing = props.spacing + 1

    return (
        Child !== null ?
            <Child
                prefix={prefix}
                spacing={spacing}
                prefixArray={prefixArray}
                data={props.data}
                root={props.root}
                path={props.path}
                clipboard={props.clipboard}
                setEditor={props.setEditor}
                clearEditor={props.clearEditor}
                setSelected={props.setSelected}
                prefixEnabled={props.prefixEnabled}
                setPath={props.setPath}
                writeable={props.writeable}
                showSwitches={props.showSwitches}
                closingTags={props.closingTags}
                selectMode={props.selectMode}
                twoLines={props.twoLines}
                isEdited={props.isEdited}
                setSelectMode={props.setSelectMode}
                isSelectable={props.isSelectable}
                setSelectable={props.setSelectable}
            /> :
            null
    )
}

export default ChildElement