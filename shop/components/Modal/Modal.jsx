import React from 'react';
import style from './Modal.module.css'

const Modal = ({children, visible, setVisible}) => {
    const rootClasses = [style.myModal];
    if (visible) {
        rootClasses.push(style.active)
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div className={style.myModalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;