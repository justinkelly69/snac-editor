import React from 'react'
import { SNAC, Checkboxes, Fields, Labels, TextInputs, Panels } from '..'
//import * as SNAC from 'snac'

const EditAttribute = (props) =>
    <>
        <Panels.EditAttributeItem oddEven={props.oddEven}>
            <Fields.AttributeNS
                onClick={() => !props.isDeleted ?
                    props.attributesOpenClose(props.atts, props.ns, props.name) :
                    props.closeAll(props.atts)
                }
                isDeleted={props.isDeleted}>
                {SNAC.getNS(props.ns)}
            </Fields.AttributeNS>
        </Panels.EditAttributeItem>

        <Panels.EditAttributeItem oddEven={props.oddEven}>
            <Fields.AttributeName
                onClick={() => !props.isDeleted ?
                    props.attributesOpenClose(props.atts, props.ns, props.name) :
                    props.closeAll(props.atts)
                }
                isDeleted={props.isDeleted}>
                {props.name}
            </Fields.AttributeName>
        </Panels.EditAttributeItem>

        <Panels.EditAttributeItem oddEven={props.oddEven}>
            {props.isOpen && !props.newAttr && !props.isDeleted ?

                <TextInputs.AttValueInput
                    onChange={(event) => {
                        props.updateAttributeValue(props.atts, props.ns, props.name, event.target.value)
                        props.setEdited(true)
                    }}
                    onDoubleClick={() => !props.isDeleted ?
                        props.attributesOpenClose(props.atts, props.ns, props.name) :
                        props.closeAll(props.atts)
                    }
                    onFocus={(event) => event.target.select()}
                    value={props.value}
                /> :

                <Fields.AttributeValue
                    onClick={() => !props.isDeleted ?
                        props.attributesOpenClose(props.atts, props.ns, props.name) :
                        props.closeAll(props.atts)
                    }
                    isDeleted={props.isDeleted}>
                    {props.value}
                </Fields.AttributeValue>
            }
        </Panels.EditAttributeItem>

        <Panels.EditAttributeItem oddEven={props.oddEven}>
            {props.newAttr || props.open ?
                null :
                <Checkboxes.Checkbox
                    disabled={false}
                    id={props.ns + ':' + props.name}
                    labelOff={Labels.DeleteAttribute}
                    labelOn={Labels.UndeleteAttribute}
                    checked={props.isDeleted}
                    onChange={() => {
                        props.markAttributeDeleted(props.atts, props.ns, props.name)
                        props.setEdited(true)
                    }}
                />
            
            }
        </Panels.EditAttributeItem>
    </>

export default EditAttribute