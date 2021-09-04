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

        <Panels.PanelSpacing />

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
                                    }}
                                    label={Labels.UnwrapElement}
                                />
                            }
                        </Panels.PanelItem>

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
                                }}
                                label={Labels.SaveElement}
                            />
                        </Panels.PanelItem>

                        <Panels.PanelItem>
                            <Buttons.StandardButton
                                onClick={() => {
                                    props.clearEditor()
                                    props.setEdited(false)
                                }}
                                label={Labels.CancelElement}
                            />
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
                            }}
                            label={Labels.PasteXML}
                        />
                    }
                </Panels.PanelItem>

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
                        }}
                        label={Labels.InsertNodeText}
                    />
                </Panels.PanelItem>

                <Panels.PanelItem>
                    <Buttons.StandardButton
                        onClick={() => {
                            props.setMode('T')
                            props.setEdited(false)
                        }}
                        label={Labels.CancelNodeText}
                    />
                </Panels.PanelItem>
            </>
        }
    </>

export default NodeHeader