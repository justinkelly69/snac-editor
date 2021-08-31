import React, { useState } from 'react'
import { NodeTag, Attributes, ChildElements, Sections } from '.'

const NodeElement = props => {
    const [aOpen, setAOpen] = useState(true)
    const [cOpen, setCOpen] = useState(true)

    return (
        <Sections.NodeSection selected={props.writeable && props.data.q}>
            {props.path.length > 0 || props.data.N !== '@@@' ?
                <>
                    <NodeTag
                        openTag={true}
                        cOpen={cOpen}
                        setCOpen={setCOpen}
                        isEdited={props.isEdited}
                        isSelectable={props.isSelectable}
                        setSelectable={props.setSelectable}
                        writeable={props.writeable}
                        {...props}
                    />
                    <Attributes
                        aOpen={aOpen}
                        setAOpen={setAOpen}
                        {...props}
                    />
                </> :
                null
            }
            {props.path.length === 0 || cOpen ?
                <ChildElements
                    elements={props.data.C}
                    twoLines={props.twoLines}
                    selectMode={props.selectMode}
                    isEdited={props.isEdited}
                    isSelectable={props.isSelectable}
                    setSelectable={props.setSelectable}
                    writeable={props.writeable}
                    {...props}
                /> :
                null
            }
            {(props.path.length > 0 || props.data.N !== '@@@') && (props.closingTags || !props.writeable)  ? // Closing XML Tag
                <NodeTag
                    openTag={false}
                    isEdited={props.isEdited}
                    isSelectable={props.isSelectable}
                    setSelectable={props.setSelectable}
                    writeable={props.writeable}
                    {...props}
                /> :
                null
            }
        </Sections.NodeSection>
    )
}
export default NodeElement