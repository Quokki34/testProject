import React from 'react';
import style from './Update.module.css';
import Card from "@/components/Card/Card";

const Update = ({update, product, setProduct, setModal, err}) => {
    return (
        <div>
            <div className={style.modal}>
                <div className={style.status}>Update data</div>
                <div>{err}</div>
                <Card prop={product} setProp={setProduct}/>
                <div className={style.wrapBtn}>
                    <button className={style.btnModal} onClick={update}>update</button>
                    <button className={style.btnModal} onClick={() => setModal(false)}>close</button>
                </div>
                
            </div> 
        </div>
    );
};

export default Update;