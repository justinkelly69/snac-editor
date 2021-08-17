import React from 'react'
import { TextAreas, Panels } from '..'

const PIBody = props =>
    <Panels.PanelBody>
        <TextAreas.PIBodyInput
            onChange={(event) => props.setBody(event.target.value)}
            value={props.body}
        />
    </Panels.PanelBody>

export default PIBody