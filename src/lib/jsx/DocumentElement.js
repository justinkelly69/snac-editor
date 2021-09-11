import React from 'react'
import { NodeElement } from '.'

const DocumentElement = props => {

    return (
        <NodeElement
            root={props.root}
            data={props.root}

            prefixEnabled={true}
            path={[]}
            prefix={[]}
            spacing={0}
            prefixArray={[]}
            showSwitches={true}
            writeable={true}
            editor={props.editor}

            setEditor={props.setEditor}
            clearEditor={props.clearEditor}
            setSelected={props.setSelected}
            setPath={props.setPath}
            setSelectable={props.setSelectable}
            isSelectable={props.isSelectable}
            setSelectMode={props.setSelectMode}
            twoLines={props.twoLines}
            closingTags={props.closingTags}
            selectMode={props.selectMode}
            isEdited={props.isEdited}
        />
    )
}

export default DocumentElement