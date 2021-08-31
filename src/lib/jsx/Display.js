import React from 'react'
import { DocumentElement, Sections, Path, DisplayHeader } from '.'

const Display = props => {


    return (
        <Sections.MainContainer>

            <DisplayHeader
                twoLines={props.twoLines}
                setTwoLines={props.setTwoLines}
                showClosingTags={props.showClosingTags}
                closingTags={props.closingTags}
                setSelectMode={props.setSelectMode}
                selectMode={props.selectMode}
                Header={props.Header}
                setEditor={props.setEditor}
                isEdited={props.isEdited}

                cutNodes={props.cutNodes}
                copyNodes={props.copyNodes}
                deleteNodes={props.deleteNodes}
                wrapNodes={props.wrapNodes}
                clearSelected={props.clearSelected}
                setEdited={props.setEdited}
                selectedNodes={props.selectedNodes}
                setSelectable={props.setSelectable}
                isSelectable={props.isSelectable}

                clearEditor={props.clearEditor}
                setSelected={props.setSelected}
                writeable={props.writeable}
                setPath={props.setPath}
                editor={props.editor}
            />

            <Sections.VerticalColumns>

                <Sections.VerticalColumn>
                    <DocumentElement

                        data={props.docProps.data}
                        setEditor={props.docProps.setEditor}
                        clearEditor={props.docProps.clearEditor}
                        setSelected={props.docProps.setSelected}
                        writeable={true}
                        //setPath={props.docProps.setPath}
                        editor={props.docProps.editor}

                        root={props.root}
                        /* data={props.data}
                        setEditor={props.setEditor}
                        clearEditor={props.clearEditor}
                        setSelected={props.setSelected}
                        writeable={props.writeable}
                        setPath={props.setPath}
                        editor={props.editor}*/
                        setPath={props.setPath}

                        setSelectable={props.setSelectable}
                        isSelectable={props.isSelectable}
                        twoLines={props.twoLines}
                        closingTags={props.closingTags}
                        selectMode={props.selectMode}
                        isEdited={props.isEdited}
                    />

                </Sections.VerticalColumn>

                <Sections.VerticalColumn>
                    {props.Body}
                </Sections.VerticalColumn>

            </Sections.VerticalColumns>

            <Sections.PathRow>
                <Path pathRow={props.pathRow} />
            </Sections.PathRow>

        </Sections.MainContainer>
    )
}

export default Display