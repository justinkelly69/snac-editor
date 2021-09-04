import React from 'react'
import styled from 'styled-components'
import { CheckboxStyles } from '..'

export const Checkbox = props =>
    <label>
        <input type="checkbox"
            disabled={props.disabled}
            checked={props.checked}
            onChange={props.onChange} />
        {props.label}
    </label>

export const NormalizeCheckbox = styled(Checkbox)`
    height: ${CheckboxStyles.height};
	width: ${CheckboxStyles.width};
`