import React from 'react'
import { Prefix, NSNameLabels, Brackets, Links, Symbols } from '..'

const NodeTag = props =>
    <>
        <Prefix
            twoLines={false}
            isAttribute={false}
            isSelectable={props.isSelectable}
            openTag={props.openTag}
            selectMode={props.selectMode}
            {...props}
        />

        {props.showSwitches &&
            <Links.NodeLink
                onClick={() => {
                    props.openTag && (props.isEdited || props.setCOpen(!props.cOpen))
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
            setSelectMode={props.setSelectMode}
            {...props} />

        {!props.openTag &&
            <Brackets.NodeCloseEndCaret />
        }
    </>

export default NodeTag