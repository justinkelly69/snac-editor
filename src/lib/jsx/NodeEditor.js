import React, { useState } from 'react'
//import * as SNAC from 'snac'
import { SNAC, Display, EditAttributes, NewAttribute, NodeHeader, Panels } from '.'

export const NodeEditor = props => {

    const [newNS, setNewNS] = useState(props.data.S === null ? "" : props.data.S)
    const [newName, setNewName] = useState(props.data.N)
    const [newAttNS, setNewAttNS] = useState("")
    const [newAttName, setNewAttName] = useState("")
    const [newAttValue, setNewAttValue] = useState("")
    const [newAttr, setNewAttr] = useState(false)
    const [atts, setAtts] = useState(SNAC.loadAttributes(props.data.A))

    // Open/Close attribute text fields.
    const attributesOpenClose = (atts, idx1, idx2) => {
        setAtts(SNAC.attributesOpenClose(atts, idx1, idx2))
    }
    const closeAll = atts => setAtts(SNAC.attsClose(atts))

    // Update the value from the text fields.
    const updateAttributeValue = (atts, idx1, idx2, value) =>
        setAtts(SNAC.updateAttributeValue(atts, idx1, idx2, value))

    // Mark/Unmark attributes as deleted.
    const markAttributeDeleted = (atts, idx1, idx2) =>
        setAtts(SNAC.markAttributeDeleted(atts, idx1, idx2))

    // Open/Close new attribute text fields.
    const newFieldsOpenClose = () => {
        if (newAttr === true) {
            setNewAttr(false)
            setNewAttNS('')
            setNewAttName('')
            setNewAttValue('')
        }
        else {
            setNewAttr(true)
        }
    }

    // Update the attributes with tne new attribute.
    const insertAttribute = (atts) => {
        setNewAttNS(SNAC.attNS(newAttNS))
        setNewAttName(SNAC.attName(newAttName))

        SNAC.attNSNameTest(newAttNS, newAttName) &&
            setAtts(SNAC.insertAttribute(atts, newAttNS, newAttName, newAttValue))
        newFieldsOpenClose()
    }

    const Header = (

        <NodeHeader
            path={props.path}
            data={props.data}
            root={props.root}
            clearEditor={props.clearEditor}
            isEdited={props.isEdited}
            setEdited={props.setEdited}
            saveNode={props.saveNode}
            unwrapNode={props.unwrapNode}
            setSelectMode={props.setSelectMode}

            canEdit={true}
            isOpen={SNAC.attsOpen(atts)}
            setNewNS={setNewNS}
            setNewName={setNewName}
            newNS={newNS}
            newName={newName}
            atts={atts}
            newAttr={newAttr}
            closeAll={closeAll}
        />
    )

    const Body = (
        <Panels.PanelBody>
            <EditAttributes
                path={props.path}
                isEdited={props.isEdited}
                setEdited={props.setEdited}

                atts={atts}
                ns={newAttNS}
                name={newAttName}
                newAttr={newAttr}
                isOpen={SNAC.attsOpen(atts)}
                attributesOpenClose={attributesOpenClose}
                closeAll={closeAll}
                updateAttributeValue={updateAttributeValue}
                markAttributeDeleted={markAttributeDeleted}

            />

            <NewAttribute
                path={props.path}
                isEdited={props.isEdited}
                setEdited={props.setEdited}

                atts={atts}
                isOpen={SNAC.attsOpen(atts)}
                insertAttribute={insertAttribute}
                setNewAttNS={setNewAttNS}
                setNewAttName={setNewAttName}
                setNewAttValue={setNewAttValue}
                newFieldsOpenClose={newFieldsOpenClose}
                newAttr={newAttr}
                ns={newAttNS}
                name={newAttName}
                value={newAttValue}

            />
        </Panels.PanelBody>
    )

    return (
        <Display
            Header={Header}
            Body={Body}
            root={props.root}
            data={props.data}
            path={props.path}
            closingTags={props.closingTags}
            twoLines={props.twoLines}
            selectMode={props.selectMode}
            pathRow={props.pathRow}
            isSelectable={props.isSelectable}
            editor={props.editor}
            selectedNodes={props.selectedNodes}
            setTwoLines={props.setTwoLines}
            showClosingTags={props.showClosingTags}
            setSelectMode={props.setSelectMode}
            cutNodes={props.cutNodes}
            copyNodes={props.copyNodes}
            deleteNodes={props.deleteNodes}
            wrapNodes={props.wrapNodes}
            clearSelected={props.clearSelected}
            setEdited={props.setEdited}
            writeable={props.writeable}
            setSelectable={props.setSelectable}
            setEditor={props.setEditor}
            clearEditor={props.clearEditor}
            setSelected={props.setSelected}
            setPath={props.setPath}
        />
    )
}

export default NodeEditor