import React from 'react'
import { NodeElement } from '.'

const DocumentElement = props => {



    return (
        <NodeElement
            prefixEnabled={true}
            path={[]}
            prefix={[]}
            spacing={0}
            prefixArray={[]}
            showSwitches={true}
            closingTags={props.closingTags}
            twoLines={props.twoLines}
            selectMode={props.selectMode}
            isEdited={props.isEdited}
            isSelectable={props.isSelectable}
            setSelectable={props.setSelectable}
            writeable={true}




            {...props}
        />
    )
}

export default DocumentElement