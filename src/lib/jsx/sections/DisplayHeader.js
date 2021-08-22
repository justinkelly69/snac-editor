import React from 'react'
import { Panels, Checkboxes, Labels } from '..'


const DisplayHeader = props => {

    const selectWidth = '8em'

    return (
        <Panels.PanelHeader>

            <Panels.PanelItem flexBasis={selectWidth}>
                <Checkboxes.NormalizeCheckbox disabled={props.isEdited}
                    label={props.selectMode ? Labels.EditMode : Labels.SelectMode}
                    checked={props.selectMode}
                    onChange={() => {
                        props.setSelectMode(props.selectMode)
                    }}
                />
            </Panels.PanelItem>

            {props.selectMode ?
                <>
                    <Panels.PanelItem flexBasis={selectWidth}>
                        <Checkboxes.NormalizeCheckbox
                            label={props.twoLines ? Labels.OneLine : Labels.TwoLines}
                            checked={props.twoLines}
                            onChange={() => {
                                props.setTwoLines(props.twoLines)
                            }}
                        />
                    </Panels.PanelItem>

                    <Panels.PanelItem flexBasis={selectWidth}>
                        <Checkboxes.NormalizeCheckbox
                            label={props.closingTags ? Labels.HideCloseTags : Labels.ShowCloseTags}
                            checked={props.closingTags}
                            onChange={() => {
                                props.showClosingTags(props.closingTags)
                            }}
                        />
                    </Panels.PanelItem>
                </> :
                <>
                    {props.Header}
                </>
            }
        </Panels.PanelHeader>
    )
}
export default DisplayHeader