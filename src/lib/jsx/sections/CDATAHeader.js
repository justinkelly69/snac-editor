import React from 'react'
import { Buttons, Labels, Brackets, Panels } from '..'

const CDATAHeader = props =>
    <>
        <Panels.PanelItem>
            <Brackets.CDATAOpenBracket />
            <Brackets.CDATACloseBracket />
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
                        {Labels.UnwrapCDATA}
                    </Buttons.StandardButton>
                </Panels.PanelItem>

                <Panels.PanelItem>
                    <Buttons.CDATAButton
                        onClick={() => {
                            props.saveCDATA(props.data, props.cdata)
                            props.setEdited(false)
                        }}>
                        {Labels.SaveCDATA}
                    </Buttons.CDATAButton>
                </Panels.PanelItem>

                <Panels.PanelItem>
                    <Buttons.StandardButton
                        onClick={() => {
                            props.clearEditor()
                            props.setEdited(false)
                        }}>
                        {Labels.CancelCDATA}
                    </Buttons.StandardButton>
                </Panels.PanelItem>
            </> :
            <>
                <Panels.PanelItem>
                    <Buttons.CDATAButton onClick={() => {
                        props.insertCDATA(props.data, {
                            before: props.textBefore,
                            inside: props.textInside,
                            after: props.textAfter
                        })
                        props.clearEditor()
                        props.setEdited(false)
                    }}>
                        {Labels.InsertCDATA}
                    </Buttons.CDATAButton>
                </Panels.PanelItem>

                <Panels.PanelItem>
                    <Buttons.StandardButton onClick={() => {
                        props.setMode('T')
                        props.setEdited(false)
                    }}>
                        {Labels.CancelCDATA}
                    </Buttons.StandardButton>
                </Panels.PanelItem>
            </>
        }
    </>

export default CDATAHeader