import React from 'react'
import * as SNAC from 'snac'
import { Editors, Fields, Sizes, Symbols, TextViews, Prefix, Panels } from '..'

const CDATAView = (props) =>

    <Fields.CDATABody
        onClick={() => {
            props.writeable && !props.isEdited && !props.selectMode && props.setEditor({
                data: props.data,
                editor: Editors.CDATA_EDITOR,
                path: props.path
            })
        }}

        onMouseOver={() => {
            props.writeable && props.setPath(props.path)
        }}

        onMouseOut={() => {
            props.writeable && props.setPath([])
        }}>

        {!props.showSwitches ?
            SNAC.escapeCDATA(props.data.D) :
            props.dOpen ?
                <>
                    <Panels.NewLine />

                    <Prefix
                        prefixEnabled={false}
                        isAttribute={false} 
                        spacing={props.spacing + props.path.length}
                    />

                    <TextViews.CDATAView>
                        {SNAC.escapeCDATA(props.data.D)}
                    </TextViews.CDATAView>

                    <Prefix
                        prefixEnabled={false}
                        isAttribute={false} 
                        spacing={props.spacing + props.path.length}
                    />

                    <Panels.NewLine />
                </> :
                SNAC.normalize(props.data.D).substr(0, Sizes.TextPreviewLength) + Symbols.TextElipsis
        }
    </Fields.CDATABody>

export default CDATAView