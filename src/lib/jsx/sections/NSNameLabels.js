import React from 'react'
import { Fields, Brackets, Editors } from '..'

const NSNameLabels = props => {

    const clickNode = () => {

        if (props.setSelectMode) {
            props.selectMode && props.setSelectMode(false)

            props.writeable && props.setEditor({
                data: props.data,
                editor: Editors.NODE_EDITOR,
                path: props.path
            })
        }
    }

    return (
        <>
            {props.data.S ?
                <>
                    <Fields.NS
                        onClick={() => props.writeable && !props.isEdited && clickNode()}
                        onMouseOver={() => { props.writeable && props.setPath(props.path) }}
                        onMouseOut={() => { props.writeable && props.setPath([]) }} >
                        {props.data.S}
                    </Fields.NS>
                    <Brackets.NodeNSSeparator />
                </> :
                null
            }

            <Fields.Name
                onClick={() => !props.isEdited && clickNode()}
                onMouseOver={() => { props.writeable && props.setPath(props.path) }}
                onMouseOut={() => { props.writeable && props.setPath([]) }} >
                {props.data.N}
            </Fields.Name>
        </>
    )
}

export default NSNameLabels