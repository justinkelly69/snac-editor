import React, { useState } from 'react'
import { Display, CommentHeader, CommentBody } from '.'

const CommentEditor = props => {
    const [comment, setComment] = useState(props.data.M)

    const Header =
        <CommentHeader
            canEdit={true}
            comment={comment}
            unwrapNode={props.unwrapNode}
            {...props}
        />

    const Body =
        <CommentBody
            setComment={setComment}
            comment={comment}
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