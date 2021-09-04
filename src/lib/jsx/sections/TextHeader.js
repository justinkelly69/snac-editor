import React from 'react'
import { Buttons, Checkboxes, Labels, Panels } from '..'

const TextHeader = props =>
    <>
        <Panels.PanelItem>
            <Buttons.StandardButton
                disabled={props.isEdited}
                onClick={() => props.setMode('N')}
                label={Labels.NewElementMode}
            />
        </Panels.PanelItem>

        <Panels.PanelItem>
            <Buttons.CDATAButton
                disabled={props.isEdited}
                onClick={() => props.setMode('D')}
                label={Labels.NewCDATAMode}
            />
        </Panels.PanelItem>

        <Panels.PanelItem>
            <Buttons.CommentButton
                disabled={props.isEdited}
                onClick={() => props.setMode('M')}
                label={Labels.NewCommentMode}
            />
        </Panels.PanelItem>

        <Panels.PanelItem>
            <Buttons.PIButton
                disabled={props.isEdited}
                onClick={() => props.setMode('P')}
                label={Labels.NewPIMode}
            />
        </Panels.PanelItem>

        <Panels.PanelItem>
            <Checkboxes.Checkbox
                onChange={(event) => {
                    props.normalizeText(event.target)
                    props.setEdited(true)
                }}
                id="normalize"
                labelOff="Normalize"
                labelOn="Normalize"
            />
        </Panels.PanelItem>

        <Panels.PanelSpacing />

        <Panels.PanelItem>
            <Buttons.StandardButton
                onClick={() => {
                    props.saveText(props.data, props.text)
                    props.setEdited(false)
                }}
                label={Labels.SaveText}
            />
        </Panels.PanelItem>

        <Panels.PanelItem>
            <Buttons.StandardButton
                onClick={() => {
                    props.clearEditor()
                    props.setEdited(false)
                }}
                label={Labels.CancelText}
            />
        </Panels.PanelItem>
    </>

export default TextHeader