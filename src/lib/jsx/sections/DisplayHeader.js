import React from 'react'
import { Panels, Checkboxes, Labels } from '..'


const DisplayHeader = props => {

    return (
        <Panels.PanelHeader>

            <Panels.PanelItem>
                <Checkboxes.NormalizeCheckbox
                    label={props.selectMode ? Labels.SelectMode : Labels.EditMode}
                    checked={props.selectMode}
                    onChange={() => {
                        props.setSelectMode(props.selectMode)
                    }}
                />
            </Panels.PanelItem>

            <Panels.PanelItem>
                <Checkboxes.NormalizeCheckbox
                    label={props.twoLines ? Labels.OneLine : Labels.TwoLines}
                    checked={props.twoLines}
                    onChange={() => {
                        props.setTwoLines(props.twoLines)
                    }}
                />
            </Panels.PanelItem>

            <Panels.PanelItem>
                <Checkboxes.NormalizeCheckbox
                    label={props.closingTags ? Labels.HideCloseTags : Labels.ShowCloseTags}
                    checked={props.closingTags}
                    onChange={() => {
                        props.showClosingTags(props.closingTags)
                    }}
                />
            </Panels.PanelItem>
        </Panels.PanelHeader>
    )
}
export default DisplayHeader