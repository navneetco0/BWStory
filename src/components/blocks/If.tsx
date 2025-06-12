import React from 'react'
import { IIf } from '../../types/block';

const If:React.FC<IIf> = ({c, children}) => {
    if(c) return children;
    return null;
}

export default If