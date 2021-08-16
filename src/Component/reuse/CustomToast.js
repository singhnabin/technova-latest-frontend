import React from 'react';
import { Toast } from 'react-bootstrap';

function CustomTaost({ variant, message }) {
    return (<Toast className="d-inline-block m-1" bg={variant.toLowerCase()}>

        <Toast.Body className={variant === 'Dark' && 'text-white'}>
            {message}
        </Toast.Body>
    </Toast >)
}
export default CustomTaost;