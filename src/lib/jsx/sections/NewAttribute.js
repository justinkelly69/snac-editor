import React from 'react'
import { TextInputs, Buttons, Labels } from '..'

const NewAttribute = (props) =>
    !props.isOpen ?
        <>
            {props.newAttr ?
                <>
                    <TextInputs.AttNSInput
                        onChange={(event) => props.setNewAttNS(event.target.value)}
                        onFocus={(event) => event.target.select()}
                        value={props.ns} />

                    <TextInputs.AttNameInput
                        onChange={(event) => props.setNewAttName(event.target.value)}
                        onFocus={(event) => event.target.select()}
                        value={props.name} />

                    <TextInputs.AttValueInput
                        onChange={(event) => props.setNewAttValue(event.target.value)}
                        onFocus={(event) => event.target.select()}
                        value={props.value} />

                    <Buttons.StandardButton
                        onClick={() => {
                            props.insertAttribute(props.atts)
                            props.setEdited(true)
                        }}
                        label={Labels.SaveAttribute}
                    />

                    <Buttons.StandardButton
                        onClick={() => {
                            props.newFieldsOpenClose(false)
                        }}
                        label={Labels.CancelAttribute}
                    />
                </> :

                <Buttons.StandardButton
                    onClick={() => {
                        props.newFieldsOpenClose(true)
                    }}
                    label={Labels.NewAttribute}
                />
            }
        </> :
        null

export default NewAttribute