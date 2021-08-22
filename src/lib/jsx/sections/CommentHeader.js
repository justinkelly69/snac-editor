import React from 'react'
import { Buttons, Labels, Brackets, Panels, Fields, Symbols } from '..'

const CommentHeader = props =>
    <>
        <Panels.PanelItem>
            <Brackets.CommentOpenBracket />
            <Fields.CommentBody>{Symbols.CommentLabel}</Fields.CommentBody>
            <Brackets.CommentCloseBracket />
        </Panels.PanelItem>

        <Panels.PanelSpacing />

        {props.canEdit && props.path && props.path.length > 1 ?
            <>
                <Panels.PanelItem>
                    <Buttons.StandardButton
                        onClick={() => {
                            props.unwrapNode(props.root, props.path)
                            props.clearEditor()
                            props.setEdited(false)
                        }}>
                        {Labels.UnwrapComment}
                    </Buttons.StandardButton>
                </Panels.PanelItem>

                <Panels.PanelItem>
                    <Buttons.CommentButton
                        onClick={() => {
                            props.saveComment(props.data, props.comment)
                            props.setEdited(false)
                        }}>
                        {Labels.SaveComment}
                    </Buttons.CommentButton>
                </Panels.PanelItem>

                <Panels.PanelItem>
                    <Buttons.StandardButton
                        onClick={() => {
                            props.clearEditor()
                            props.setEdited(false)
                        }}>
                        {Labels.CancelComment}
                    </Buttons.StandardButton>
                </Panels.PanelItem>
            </> :
            <>
                <Panels.PanelItem>
                    <Buttons.CommentButton
                        onClick={() => {
                            props.insertComment(props.data, {
                                before: props.textBefore,
                                inside: props.textInside,
                                after: props.textAfter
                            })
                            props.clearEditor()
                            props.setEdited(false)
                        }}>
                        {Labels.InsertComment}
                    </Buttons.CommentButton>
                </Panels.PanelItem>

                <Panels.PanelItem>
                    <Buttons.StandardButton
                        onClick={() => {
                            props.setMode('T')
                            props.setEdited(false)
                        }}>
                        {Labels.CancelComment}
                    </Buttons.StandardButton>
                </Panels.PanelItem>
            </>
        }
    </>

export default CommentHeader