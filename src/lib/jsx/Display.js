import React from 'react'
import {
    DocumentElement, Sections, Path, DisplayHeader
} from '.'

const Display = props => {

    let header = props.Header ?
        props.Header :
        <DisplayHeader
            twoLines={props.twoLines}
            setTwoLines={props.setTwoLines}
            showClosingTags={props.showClosingTags}
            closingTags={props.closingTags}
            setSelectMode={props.setSelectMode}
            selectMode={props.selectMode}
        />

    return (
        <Sections.MainContainer>

            <Sections.TopRow>
                {header}
            </Sections.TopRow>

            <Sections.VerticalColumns>

                <Sections.VerticalColumn>
                    <DocumentElement
                        data={props.docProps.data}
                        setEditor={props.docProps.setEditor}
                        clearEditor={props.docProps.clearEditor}
                        setSelected={props.docProps.setSelected}
                        writeable={props.docProps.writeable}
                        setPath={props.docProps.setPath}
                        editor={props.docProps.editor}
                        twoLines={props.twoLines}
                        closingTags={props.closingTags}
                        selectMode={props.selectMode}
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