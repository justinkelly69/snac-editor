import React from 'react'
import { Prefix, NSNameLabels, Brackets, Links, Symbols } from '..'

const NodeTag = props =>
    <>
        <Prefix
            twoLines={props.twoLines}
            isSelectable={props.isSelectable}
            {...props}
        />

        {props.showSwitches &&
            <Links.NodeLink
                onClick={() => {
                    props.isEdited || props.setCOpen(!props.cOpen)
                }}
                active={props.cOpen}>
                {props.cOpen ?
                    Symbols.ToggleOpen :
                    Symbols.ToggleClose
                }
            </Links.NodeLink>
        }

        {props.openTag ?
            <Brackets.NodeOpenStartCaret /> :
            <Brackets.NodeCloseStartCaret />
        }

        <NSNameLabels
            isEdited={props.isEdited}
            setEdited={props.setEdited}
            {...props} />

        {!props.openTag &&
            <Brackets.NodeCloseEndCaret />
        }
    </>

export default NodeTag