import styled from 'styled-components';

export const InputText = styled.input`
    padding: 12px 20px;
    border: none;
    border-bottom: 1px dashed rgb(138, 5, 190);
    margin: 5px;
    width: 50%;
    &:focus {
        outline: none;
    }
`;

export const Error = styled.span`
    color: #DC143C;
    font-size: 10px;
    margin-bottom: 10px;
`