import React from 'react'
import { TextAreas, Panels } from '..'

const CDATABody = props =>
    <Panels.PanelBody>
        <TextAreas.CDATAInput
            value={props.cdata}
            onChange={(event) => props.setCDATA(event.target.value)}
        />
    </Panels.PanelBody>

export default CDATABody