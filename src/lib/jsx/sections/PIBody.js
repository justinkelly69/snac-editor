import React from 'react'
import { TextAreas, Panels } from '..'

const PIBody = props =>

    <Panels.PanelBody>
        <TextAreas.PIBodyInput
            value={props.body}
            onChange={(event) => {
                props.setBody(event.target.value)
                props.setEdited(true)
            }}
        />
    </Panels.PanelBody>

export default PIBody