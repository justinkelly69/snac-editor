import React from 'react'
import { SNAC, ChildElement } from '..'
//import * as SNAC from 'snac'

const ChildElements = props => {

    return (
        <>
            {props.elements.map((element, index) =>
                <ChildElement
                    type={SNAC.itemType(element)}
                    key={element._}
                    data={element}
                    index={index}
                    root={props.root}
                    path={[...props.path, index]}
                    prefix={props.prefix}
                    spacing={props.spacing}
                    prefixArray={props.prefixArray}
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
                    setSelectMode={props.setSelectMode}
                    twoLines={props.twoLines}
                    isEdited={props.isEdited}
                    isSelectable={props.isSelectable}
                    setSelectable={props.setSelectable}
                />
            )}
        </>
    )
}
export default ChildElements