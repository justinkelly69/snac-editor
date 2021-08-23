import React from 'react'
import { Panels, Checkboxes, Labels, XMLHeader } from '..'


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

                    <XMLHeader
                        cutNodes={props.cutNodes}
                        copyNodes={props.copyNodes}
                        deleteNodes={props.deleteNodes}
                        wrapNodes={props.wrapNodes}
                        clearSelected={props.clearSelected}
                        setEdited={props.setEdited}
                        setEditor={props.setEditor}
                        clearEditor={props.clearEditor}
                        setSelected={props.setSelected}
                        writeable={props.writeable}
                        setPath={props.setPath}
                        editor={props.editor}
                        selectedNodes={props.selectedNodes}
                        setSelectable={props.setSelectable}
                        isSelectable={props.isSelectable}
                        {...props}
                    />
                </> :
                <>
                    {props.Header}
                </>
            }
        </Panels.PanelHeader>
    )
}
export default DisplayHeader