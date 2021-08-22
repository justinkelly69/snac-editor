import React, { useState } from 'react'
import { Display, CommentHeader, CommentBody } from '.'

const CommentEditor = props => {

    const [comment, setComment] = useState(props.data.M)

    const Header =
        <CommentHeader
            canEdit={true}
            comment={comment}
            unwrapNode={props.unwrapNode}
            setEdited={props.setEdited}
            {...props}
        />

    const Body =
        <CommentBody
            setComment={setComment}
            comment={comment}
            setEdited={props.setEdited}
        />


    return (
        <Display
            Header={Header}
            Body={Body}
            selectMode={props.selectMode}
            {...props}
        />
    )
}

export default CommentEditor