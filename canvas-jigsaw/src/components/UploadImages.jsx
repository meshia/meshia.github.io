import React from 'react';
import { Button } from './styles/Button';


export const UploadImages = () => {

    return (
        <>
        <Button>
            Upload a file
        </Button>
        <input type="file" style={{display:'none'}} />
        </>
    )
}

 