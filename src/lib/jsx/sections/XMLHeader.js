import React, { useState } from 'react'
import { Buttons, Labels, Panels, Constants, NSNameTextInputs, SNAC } from '..'

const XMLHeader = props => {

    const [mode, setMode] = useState(Constants.NO_SELECTION)
    const [newNS, setNewNS] = useState("")
    const [newName, setNewName] = useState("")
    const disabled = props.selectedNodes.length === 0

    return (
        <Panels.PanelHeader>
            {mode === Constants.NO_SELECTION ? (
                <>
                    <Panels.PanelItem>
                        <Buttons.StandardButton
                            disabled={disabled}
                            onClick={() => {
                                props.cutNodes()
                                props.clearEditor()
                                props.setSelectMode(false)
                            }}>
                            {Labels.CutXML}
                        </Buttons.StandardButton>
                    </Panels.PanelItem>

                    <Panels.PanelItem>
                        <Buttons.StandardButton
                            disabled={disabled}
                            onClick={() => {
                                props.copyNodes()
                                props.clearEditor()
                                props.setSelectMode(false)
                            }}>
                            {Labels.CopyXML}
                        </Buttons.StandardButton>
                    </Panels.PanelItem>

                    <Panels.PanelItem>
                        <Buttons.StandardButton
                            disabled={disabled}
                            onClick={() => {
                                setMode(Constants.WRAP)
                                props.setSelectable(false)
                            }}>
                            {Labels.WrapXML}
                        </Buttons.StandardButton>
                    </Panels.PanelItem>

                    <Panels.PanelItem>
                        <Buttons.StandardButton
                            disabled={disabled}
                            onClick={() => {
                                props.deleteNodes()
                                props.clearEditor()
                                props.setSelectMode(false)
                            }}>
                            {Labels.DeleteXML}
                        </Buttons.StandardButton>
                    </Panels.PanelItem>

                    <Panels.PanelItem>
                        <Buttons.StandardButton
                            disabled={disabled}
                            onClick={() => {
                                props.clearSelected(f => f)
                                props.clearEditor()
                                props.setSelectMode(false)
                            }}>
                            {Labels.ClearXML}
                        </Buttons.StandardButton>
                    </Panels.PanelItem>
                </>
            ) : mode === Constants.WRAP ? (
                <>
                    <Panels.PanelItem>
                        <NSNameTextInputs
                            setNewNS={setNewNS}
                            setNewName={setNewName}
                            setEdited={props.setEdited}
                        />
                    </Panels.PanelItem>

                    <Panels.PanelItem>
                        <Buttons.StandardButton
                            onClick={() => {
                                props.wrapNodes(newNS, newName)
                                props.clearEditor()
                                props.setSelectable(true)
                                props.setSelectMode(false)
                            }}>
                            {Labels.WrapXML}
                        </Buttons.StandardButton>
                    </Panels.PanelItem>

                    <Panels.PanelItem>
                        <Buttons.StandardButton
                            onClick={() => {
                                //props.clearEditor()
                                props.setSelectable(true)
                                setMode(Constants.NO_SELECTION)
                            }}>
                            {Labels.CancelXML}
                        </Buttons.StandardButton>
                    </Panels.PanelItem>

                </>
            ) : null
            }

            <Panels.PanelSpacing />

        </Panels.PanelHeader>
    )
}

export default XMLHeader