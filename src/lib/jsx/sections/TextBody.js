import React from 'react'
import { TextAreas, Panels } from '..'

const TextBody = props =>

    <Panels.PanelBody>
        <TextAreas.TextInput
            value={props.text}
            readOnly={props.mode !== 'T'}
            onChange={(event) => props.saveEdit(event.target)}
            onSelect={(event) => props.saveSelect(event.target)}
        />
    </Panels.PanelBody>

export default TextBody