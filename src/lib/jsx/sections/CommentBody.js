import React from 'react'
import { TextAreas, Panels } from '..'

const CommentBody = props =>
    <Panels.PanelBody>
        <TextAreas.CommentInput
            onChange={(event) => props.setComment(event.target.value)}
            value={props.comment}
        />
    </Panels.PanelBody>

export default CommentBody