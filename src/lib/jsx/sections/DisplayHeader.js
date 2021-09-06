import React from 'react'
import { Panels, Checkboxes, Labels, XMLHeader } from '..'


const DisplayHeader = props => {

    return (
        <Panels.PanelHeader>

            <Panels.PanelItem>
                <Checkboxes.Checkbox
                    disabled={props.isEdited}
                    id="mode"
                    labelOff={Labels.Select}
                    labelOn={Labels.Select}
                    checked={props.selectMode}
                    onChange={() => {
                        props.setSelectMode(!props.selectMode)
                    }}
                />
            </Panels.PanelItem>

            <Panels.PanelItem>
                <Checkboxes.Checkbox
                    id="lines"
                    checked={props.twoLines}
                    labelOff={Labels.TwoLines}
                    labelOn={Labels.TwoLines}
                    onChange={() => {
                        props.setTwoLines(props.twoLines)
                    }}
                />
            </Panels.PanelItem>

            <Panels.PanelItem>
                <Checkboxes.Checkbox
                    id="close"
                    labelOff={Labels.CloseTags}
                    labelOn={Labels.CloseTags}
                    checked={props.closingTags}
                    onChange={() => {
                        props.showClosingTags(props.closingTags)
                    }}
                />
            </Panels.PanelItem>

            {props.selectMode ?
                <>
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