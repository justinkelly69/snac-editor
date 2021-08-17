import React from 'react'
import {
    DocumentElement, Sections, Path
} from '.'

const Display = props => {

    return (
        <Sections.MainContainer>

            <Sections.TopRow>
                {props.Header}
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