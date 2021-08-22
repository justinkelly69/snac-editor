import React from 'react'
import { TextAreas, Panels } from '..'

const CommentBody = props =>

    <Panels.PanelBody>
        <TextAreas.CommentInput
            value={props.comment}
            onChange={(event) => {
                props.setComment(event.target.value)
                props.setEdited(true)
            }}
        />
    </Panels.PanelBody>

export default CommentBody