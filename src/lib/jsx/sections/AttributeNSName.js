import React from 'react'
import { Brackets, Fields } from '..'
import * as SNAC from 'snac'

const AttributeNSName = props =>
    <>
        {props.ns && props.ns !== '@' ?
            <>
                <Fields.AttributeNS
                    onMouseOver={() => {
                        props.writeable && props.setPath(
                            props.path,
                            SNAC.getAttribute(props.ns, props.name, props.data.A)
                        )
                    }}
                    onMouseOut={() => { props.writeable && props.setPath([]) }}>
                    {props.ns}
                </Fields.AttributeNS>
                <Brackets.AttributeNSSeparator />
            </> :
            null
        }
        <Fields.AttributeName
            onMouseOver={() => {
                props.writeable && props.setPath(
                    props.path,
                    SNAC.getAttribute(props.ns, props.name, props.data.A)
                )
            }}
            onMouseOut={() => { props.writeable && props.setPath([]) }}>
            {props.name}
        </Fields.AttributeName>
    </>

export default AttributeNSName