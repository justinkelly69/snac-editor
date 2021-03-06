import React from 'react'
import { SNAC, PrefixButton, Symbols, Panels } from '.'
//import * as SNAC from 'snac'

const Prefix = props => {

    return (
        <>
            {props.prefixEnabled ? (
                <>
                    {!props.isAttribute && props.twoLines && props.path.length > 1 &&
                        <>
                            <PrefixButton
                                openTag={false}
                                writeable={props.writeable}
                            />

                            <Panels.Prefix>
                                {SNAC.getPrefixString(
                                    [...props.prefixArray, true],
                                    Symbols.PrefixOff,
                                    Symbols.PrefixOn
                                )}
                            </Panels.Prefix>

                            <Panels.NewLine />
                        </>
                    }
                    
                    <PrefixButton
                        openTag={props.openTag && props.isSelectable}
                        writeable={props.writeable}
                        data={props.data}
                        path={props.path}
                        prefix={props.prefix}
                        setEditor={props.setEditor}
                        setSelected={props.setSelected}
                        setSelectMode={props.setSelectMode}
                        selectMode={props.selectMode}
                    />

                    <Panels.Prefix>
                        {SNAC.getPrefixString(
                            props.prefixArray,
                            Symbols.PrefixOff,
                            Symbols.PrefixOn
                        )}
                    </Panels.Prefix>
                </>
            ) :
                <Panels.Prefix>
                    {SNAC.makeSpacing(
                        props.spacing - 1,
                        Symbols.PrefixOff
                    )}
                </Panels.Prefix>
            }
        </>
    )
}

export default Prefix