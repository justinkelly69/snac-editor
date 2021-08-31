import React from 'react'
//import * as SNAC from 'snac'
import { SNAC, Editors, Fields, Sizes, Symbols, TextViews, Prefix, Panels } from '..'

const CommentView = (props) =>
    <Fields.CommentBody
        onClick={() => {
            props.writeable && !props.isEdited && !props.selectMode && props.setEditor({
                data: props.data,
                editor: Editors.COMMENT_EDITOR,
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
            SNAC.escapeComment(props.data.M) :
            props.mOpen ?
                <>
                    <Panels.NewLine />
                    <Prefix
                        prefixEnabled={false}
                        isAttribute={false} 
                        spacing={props.spacing + props.path.length}
                    />
                    <TextViews.CommentView>
                        {SNAC.escapeComment(props.data.M)}
                    </TextViews.CommentView>
                    <Prefix
                        prefixEnabled={false}
                        isAttribute={false} 
                        spacing={props.spacing + props.path.length}
                    />
                    <Panels.NewLine />
                </> :
                SNAC.normalize(props.data.M).substr(0, Sizes.TextPreviewLength) + Symbols.TextElipsis
        }
    </Fields.CommentBody>

export default CommentView