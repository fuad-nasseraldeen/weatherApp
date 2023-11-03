
import React, { ReactNode } from 'react'

export interface OwnProps {
    setIsOpen: any
    children?: ReactNode
}
const Modal = (props: OwnProps) => {

    return (
        <>
            <div className='darkBG' onClick={() => props.setIsOpen(false)} />
            <div className='modal'>
                <div className="icon">
                    <img width="88" height="88" src="https://img.icons8.com/fluency/48/box-important--v1.png" alt="box-important--v1" />
                </div>
                <div className='modalContent header'>
                    {props.children}
                </div>
                <button className='okBtn header' onClick={() => props.setIsOpen(false)}>
                    Ok
                </button>
            </div>

        </>
    )
}

export default Modal