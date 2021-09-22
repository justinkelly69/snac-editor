import React, { useState } from 'react'
import { NodeTag, Attributes, ChildElements, Sections } from '.'

const NodeElement = props => {
    const [aOpen, setAOpen] = useState(true)
    const [cOpen, setCOpen] = useState(true)

    return (
        <Sections.NodeSection selected={props.writeable && props.data.q}>

            <NodeTag
                root={props.root}
                data={props.data}


                openTag={true}
                cOpen={cOpen}
                setCOpen={setCOpen}
                isEdited={props.isEdited}
                isSelectable={props.isSelectable}
                setSelectable={props.setSelectable}
                setSelectMode={props.setSelectMode}
                writeable={props.writeable}

                prefixEnabled={true}
                path={props.path}
                prefix={props.prefix}
                spacing={props.spacing}
                prefixArray={props.prefixArray}
                showSwitches={true}
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
            //{...props}
            />
            <Attributes
                root={props.root}
                data={props.data}

                aOpen={aOpen}
                setAOpen={setAOpen}

                prefixEnabled={true}
                path={props.path}
                prefix={props.prefix}
                spacing={props.spacing}
                prefixArray={props.prefixArray}
                showSwitches={true}
                editor={props.editor}
            //{...props}
            />

            {props.path.length === 0 || cOpen ?
                <ChildElements
                    root={props.root}
                    data={props.data}
                    elements={props.data.C}
                    twoLines={props.twoLines}
                    selectMode={props.selectMode}
                    isEdited={props.isEdited}
                    isSelectable={props.isSelectable}
                    setSelectable={props.setSelectable}
                    writeable={props.writeable}

                    prefixEnabled={true}
                    path={props.path}
                    prefix={props.prefix}
                    spacing={props.spacing}
                    prefixArray={props.prefixArray}
                    showSwitches={true}
                    editor={props.editor}

                    setSelectMode={props.setSelectMode}
                {...props}
                /> :
                null
            }

            <NodeTag
                root={props.root}
                data={props.data}
                openTag={false}
                isEdited={props.isEdited}
                isSelectable={props.isSelectable}
                setSelectable={props.setSelectable}
                writeable={props.writeable}

                prefixEnabled={true}
                path={props.path}
                prefix={props.prefix}
                spacing={props.spacing}
                prefixArray={props.prefixArray}
                showSwitches={true}
                editor={props.editor}
                setSelectMode={props.setSelectMode}
            //{...props}
            />

        </Sections.NodeSection>
    )
}
export default NodeElement