import React from 'react'
import { Buttons, Labels, Panels, NSNameTextInputs } from '..'

const NodeHeader = props =>
    <>
        <Panels.PanelItem>
            <NSNameTextInputs
                setNewNS={props.setNewNS}
                setNewName={props.setNewName}
                newNS={props.newNS}
                newName={props.newName}
                setEdited={props.setEdited}
            />
        </Panels.PanelItem>

        {props.canEdit ?
            <>
                {!props.newAttr &&
                    <>
                        <Panels.PanelItem>
                            {props.path.length > 1 &&
                                <Buttons.StandardButton
                                    onClick={() => {
                                        props.unwrapNode(props.root, props.path)
                                        props.clearEditor()
                                        props.setEdited(false)
                                    }}>
                                    {Labels.UnwrapElement}
                                </Buttons.StandardButton>
                            }
                        </Panels.PanelItem>

                        <Panels.PanelSpacing />

                        <Panels.PanelItem>
                            <Buttons.StandardButton
                                onClick={() => {
                                    props.saveNode(
                                        props.data,
                                        props.newNS,
                                        props.newName,
                                        props.atts
                                    )
                                    props.closeAll(props.atts)
                                    props.setEdited(false)
                                }}>
                                {Labels.SaveElement}
                            </Buttons.StandardButton>
                        </Panels.PanelItem>

                        <Panels.PanelItem>
                            <Buttons.StandardButton
                                onClick={() => {
                                    props.clearEditor()
                                    props.setEdited(false)
                                }}>
                                {Labels.CancelElement}
                            </Buttons.StandardButton>
                        </Panels.PanelItem>
                    </>
                }
            </> :
            <>
                <Panels.PanelItem>
                    {props.pasteEnable() &&
                        <Buttons.StandardButton
                            onClick={() => {
                                props.pasteNodes(props.data, {
                                    before: props.textBefore,
                                    after: props.textAfter
                                })
                                props.clearEditor()
                                props.setEdited(false)
                            }}>
                            {Labels.PasteXML}
                        </Buttons.StandardButton>
                    }
                </Panels.PanelItem>

                <Panels.PanelSpacing />

                <Panels.PanelItem>
                    <Buttons.StandardButton
                        onClick={() => {
                            props.insertNode(props.data, {
                                S: props.newNS,
                                N: props.newName,
                                before: props.textBefore,
                                inside: props.textInside,
                                after: props.textAfter
                            })
                            props.setEdited(false)
                        }}>
                        {Labels.InsertNodeText}
                    </Buttons.StandardButton>
                </Panels.PanelItem>

                <Panels.PanelItem>
                    <Buttons.StandardButton
                        onClick={() => {
                            props.setMode('T')
                            props.setEdited(false)
                        }}>
                        {Labels.CancelNodeText}
                    </Buttons.StandardButton>
                </Panels.PanelItem>
            </>
        }
    </>

export default NodeHeader