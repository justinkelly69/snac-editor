import React, { useState } from 'react'
import { Prefix, Brackets, CommentView, Settings, Fields, Sections, Links, Symbols } from '.'

const CommentElement = props => {
    const [mOpen, setMOpen] = useState(false)

    return (
        <Sections.TextSection selected={props.writeable && props.data.q}>

            <Prefix
                openTag={true}
                twoLines={Settings.PREFIX_TWO_LINES}
                isSelectable={props.isSelectable}
                {...props}
            />

            {props.showSwitches &&
                <Links.NodeLink onClick={() => setMOpen(!mOpen)}>
                    {mOpen ?
                        Symbols.ToggleOpen :
                        Symbols.ToggleClose
                    }
                </Links.NodeLink>
            }

            <Fields.CommentBody>
                <Brackets.CommentOpenBracket />
                <CommentView
                    mOpen={mOpen}
                    isEdited={props.isEdited}
                    {...props}
                />
                <Brackets.CommentCloseBracket />
            </Fields.CommentBody>
            
        </Sections.TextSection>
    )
}
export default CommentElement