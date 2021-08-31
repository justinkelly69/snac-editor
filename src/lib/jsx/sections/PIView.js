import React from 'react'
//import * as SNAC from 'snac'
import { SNAC, Editors, Fields, Sizes, Symbols, TextViews, Prefix, Panels } from '..'

const PIView = (props) =>

    <Fields.PIBody
        onClick={() => {
            props.writeable && !props.isEdited && !props.selectMode && props.setEditor({
                data: props.data,
                editor: Editors.PI_EDITOR,
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
            SNAC.escapePI(props.data.B) :
            props.pOpen ?
                <>
                    <Panels.NewLine />

                    <Prefix
                        prefixEnabled={false}
                        isAttribute={false}
                        spacing={props.spacing + props.path.length}
                    />

                    <TextViews.PIBodyView>
                        {SNAC.escapePI(props.data.B)}
                    </TextViews.PIBodyView>

                    <Prefix
                        prefixEnabled={false}
                        isAttribute={false}
                        spacing={props.spacing + props.path.length}
                    />

                    <Panels.NewLine />
                </> :
                SNAC.normalize(props.data.B).substr(0, Sizes.TextPreviewLength) + Symbols.TextElipsis
        }
    </Fields.PIBody>

export default PIView