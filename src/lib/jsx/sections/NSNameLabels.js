import React from 'react'
import { Fields, Brackets, Editors } from '..'

const NSNameLabels = props => {

    const clickNode = () => {
        props.writeable && props.setEditor({
            data: props.data,
            editor: Editors.NODE_EDITOR,
            path: props.path
        })
    }

    return (
        <>
            {props.data.S ?
                <>
                    <Fields.NS
                        onClick={() => props.writeable && !props.isEdited && !props.selectMode && clickNode()}
                        onMouseOver={() => { props.writeable && props.setPath(props.path) }}
                        onMouseOut={() => { props.writeable && props.setPath([]) }} >
                        {props.data.S}
                    </Fields.NS>
                    <Brackets.NodeNSSeparator />
                </> :
                null
            }

            <Fields.Name
                onClick={() => !props.isEdited && !props.selectMode && clickNode()}
                onMouseOver={() => { props.writeable && props.setPath(props.path) }}
                onMouseOut={() => { props.writeable && props.setPath([]) }} >
                {props.data.N}
            </Fields.Name>
        </>
    )
}

export default NSNameLabels