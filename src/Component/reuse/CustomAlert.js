
import { Alert } from 'react-bootstrap'
import React from 'react'

function CustomAlert({variant,message}) {
    return (
        <div>
             <Alert variant={variant}>

                 {message}

       



  </Alert>
            
        </div>
    )
}

export default CustomAlert
