import React, { useState } from 'react'
import { CDATAView, Brackets, Prefix, Settings, Sections, Fields, Links, Symbols } from '.'

const CDATAElement = props => {
    const [dOpen, setDOpen] = useState(false)

    return (
        <Sections.TextSection selected={props.writeable && props.data.q}>
            <Prefix
                openTag={true}
                twoLines={Settings.PREFIX_TWO_LINES}
                isSelectable={props.isSelectable}
                {...props}
            />
            {props.showSwitches &&
                <Links.NodeLink onClick={() => setDOpen(!dOpen)}>
                    {dOpen ?
                        Symbols.ToggleOpen :
                        Symbols.ToggleClose
                    }
                </Links.NodeLink>
            }
            <Fields.CDATABody>
                <Brackets.CDATAOpenBracket />
                <CDATAView
                    dOpen={dOpen}
                    isEdited={props.isEdited}
                    {...props}
                />
                <Brackets.CDATACloseBracket />
            </Fields.CDATABody>
        </Sections.TextSection>
    )
}
export default CDATAElement