import React from 'react'
import { NodeElement } from '.'

const DocumentElement = props =>
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
        {...props}
    />
export default DocumentElement