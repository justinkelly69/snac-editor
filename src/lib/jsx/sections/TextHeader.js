import React from 'react'
import { Buttons, Checkboxes, Labels, Panels } from '..'

const TextHeader = props =>
    <>
        <Panels.PanelItem>
            <Buttons.StandardButton
                disabled={props.isEdited}
                onClick={() => props.setMode('N')}>
                {Labels.NewElementMode}
            </Buttons.StandardButton>
        </Panels.PanelItem>

        <Panels.PanelItem>
            <Buttons.CDATAButton
                disabled={props.isEdited}
                onClick={() => props.setMode('D')}>
                {Labels.NewCDATAMode}
            </Buttons.CDATAButton>
        </Panels.PanelItem>

        <Panels.PanelItem>
            <Buttons.CommentButton
                disabled={props.isEdited}
                onClick={() => props.setMode('M')}>
                {Labels.NewCommentMode}
            </Buttons.CommentButton>
        </Panels.PanelItem>

        <Panels.PanelItem>
            <Buttons.PIButton
                disabled={props.isEdited}
                onClick={() => props.setMode('P')}>
                {Labels.NewPIMode}
            </Buttons.PIButton>
        </Panels.PanelItem>

        <Panels.PanelItem>
            <Checkboxes.NormalizeCheckbox
                onChange={(event) => {
                    props.normalizeText(event.target)
                    props.setEdited(true)
                }}
                name="normalize" label="Normalize" />
        </Panels.PanelItem>

        <Panels.PanelSpacing />

        <Panels.PanelItem>
            <Buttons.StandardButton
                onClick={() => {
                    props.saveText(props.data, props.text)
                    props.setEdited(false)
                }}>
                {Labels.SaveText}
            </Buttons.StandardButton>
        </Panels.PanelItem>

        <Panels.PanelItem>
            <Buttons.StandardButton
                onClick={() => {
                    props.clearEditor()
                    props.setEdited(false)
                }}>
                {Labels.CancelText}
            </Buttons.StandardButton>
        </Panels.PanelItem>
    </>

export default TextHeader