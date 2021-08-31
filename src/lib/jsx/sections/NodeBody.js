import React from 'react'
//import * as SNAC from 'snac'
import { SNAC, EditAttributes, NewAttribute, Panels } from '..'

export const NodeBody = props =>

    <Panels.PanelBody>

        <EditAttributes
            atts={props.atts}
            ns={props.newAttNS}
            name={props.newAttName}
            newAttr={props.newAttr}
            isOpen={SNAC.attsOpen(props.atts)}
            attributesOpenClose={props.attributesOpenClose}
            closeAll={props.closeAll}
            updateAttributeValue={props.updateAttributeValue}
            markAttributeDeleted={props.markAttributeDeleted}
            {...props}
        />

        <NewAttribute
            atts={props.atts}
            isOpen={SNAC.attsOpen(props.atts)}
            insertAttribute={props.insertAttribute}
            setNewAttNS={props.setNewAttNS}
            setNewAttName={props.setNewAttName}
            setNewAttValue={props.setNewAttValue}
            newFieldsOpenClose={props.newFieldsOpenClose}
            newAttr={props.newAttr}
            ns={props.newAttNS}
            name={props.newAttName}
            value={props.newAttValue}
        />
        
    </Panels.PanelBody>

export default NodeBody