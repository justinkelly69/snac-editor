import React from 'react'
import { Buttons, Labels, Brackets, Panels, PanelButtonsRight, TextInputs, Fields } from '..'

const PIHeader = props =>
    <>
        <Panels.PanelItem marginRight={PanelButtonsRight.marginRight}>
            <Brackets.PIOpenBracket />
            <Fields.PILang>{Labels.PIHeading}</Fields.PILang>
            <Brackets.PICloseBracket />
        </Panels.PanelItem>

        <Panels.PanelItem>
            <TextInputs.PILangInput
                value={props.lang}
                onChange={(event) => {
                    props.setLang(event.target.value)
                    props.setEdited(true)
                }}
            />
        </Panels.PanelItem>

        <Panels.PanelSpacing />

        {props.canEdit && props.path && props.path.length > 1 ?
            <>
                <Panels.PanelItem>
                    <Buttons.StandardButton
                        onClick={() => {
                            props.unwrapNode(props.root, props.path)
                            props.clearEditor()
                            props.setEdited(false)
                        }}
                        label={Labels.UnwrapPI}
                    />
                </Panels.PanelItem>

                <Panels.PanelItem>
                    <Buttons.PIButton
                        onClick={() => {
                            props.savePI(props.data, props.lang, props.body)
                            props.setEdited(false)
                        }}
                        label={Labels.SavePI}
                    />
                </Panels.PanelItem>

                <Panels.PanelItem>
                    <Buttons.StandardButton
                        onClick={() => {
                            props.clearEditor()
                            props.setEdited(false)
                        }}
                        label={Labels.CancelPI}
                    />
                </Panels.PanelItem>
            </> :
            <>
                <Panels.PanelItem>
                    <Buttons.PIButton
                        onClick={() => {
                            props.insertPI(props.data, {
                                lang: props.lang,
                                before: props.textBefore,
                                inside: props.textInside,
                                after: props.textAfter
                            })
                            props.clearEditor()
                            props.setEdited(false)
                        }}
                        label={Labels.InsertPI}
                    />
                </Panels.PanelItem>

                <Panels.PanelItem>
                    <Buttons.StandardButton
                        onClick={() => {
                            props.setMode('T')
                            props.setEdited(false)
                        }}
                        label={Labels.CancelPI}
                    />
                </Panels.PanelItem>
            </>
        }
    </>

export default PIHeader