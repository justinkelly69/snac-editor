import React from 'react'
//import * as SNAC from 'snac'
import { SNAC, Editors, Fields, Sizes, Symbols, TextViews } from '..'

const TextView = (props) =>

    <Fields.TextBody
        onClick={() => {
            if (props.setSelectMode) {
                props.selectMode && props.setSelectMode(false)
                props.writeable && !props.isEdited && props.setEditor({
                    data: props.data,
                    editor: Editors.TEXT_EDITOR
                })
            }
        }}

        onMouseOver={() => {
            props.writeable && props.setPath(props.path)
        }}

        onMouseOut={() => {
            props.writeable && props.setPath([])
        }}>

        {!props.showSwitches ?
            SNAC.escapeXML(props.data.T) :
            props.tOpen ?
                <TextViews.TextView>
                    {SNAC.escapeXML(props.data.T)}
                </TextViews.TextView> :
                SNAC.normalize(props.data.T).substring(0, Sizes.TextPreviewLength) + Symbols.TextElipsis
        }

    </Fields.TextBody>

export default TextView