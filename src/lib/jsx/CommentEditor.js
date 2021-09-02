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
            //selectMode={props.selectMode}
            //writeable={props.writeable}
            //{...props}

            root={props.root}
            data={props.data}
            path={props.path}
            closingTags={props.closingTags}
            twoLines={props.twoLines}
            selectMode={props.selectMode}
            pathRow={props.pathRow}
            isSelectable={props.isSelectable}
            editor={props.editor}
            selectedNodes={props.selectedNodes}

            docProps={props.docProps}

            setTwoLines={props.setTwoLines}
            showClosingTags={props.showClosingTags}
            setSelectMode={props.setSelectMode}
            cutNodes={props.cutNodes}
            copyNodes={props.copyNodes}
            deleteNodes={props.deleteNodes}
            wrapNodes={props.wrapNodes}
            clearSelected={props.clearSelected}
            setEdited={props.setEdited}
            writeable={props.writeable}
            setSelectable={props.setSelectable}
            setEditor={props.setEditor}
            clearEditor={props.clearEditor}
            setSelected={props.setSelected}
            setPath={props.setPath}
        />
    )
}

export default CommentEditor