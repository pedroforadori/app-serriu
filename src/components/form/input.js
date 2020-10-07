import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { InputText, Error } from './styles';

export default function Input({ name, ...rest }) {
    const inputRef = useRef(null)
    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField])

    return (
        <>
            <InputText
                ref={inputRef}
                {...rest}
                className={error ? 'has-error' : ''} />
                
                { error && <Error>{error}</Error>}
        </>
    );
}
