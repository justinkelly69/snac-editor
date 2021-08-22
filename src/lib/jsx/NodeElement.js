import React, { useState } from 'react'
import { NodeTag, Attributes, ChildElements, Sections } from '.'

const NodeElement = props => {
    const [aOpen, setAOpen] = useState(false)
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
                    {...props}
                /> :
                null
            }
            {(props.closingTags || !props.writeable) && (props.path.length > 0 || props.data.N !== '@@@') ? // Closing XML Tag
                <NodeTag
                    openTag={false}
                    isEdited={props.isEdited}
                    {...props}
                /> :
                null
            }
        </Sections.NodeSection>
    )
}
export default NodeElement