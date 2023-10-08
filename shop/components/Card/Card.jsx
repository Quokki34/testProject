import React from 'react';
import style from './Card.module.css';

const Card = ({prop , setProp, setApi}) => {
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.inputs}>
                    <input className='title' type='text' placeholder='title' value={prop.title } onChange={(e) => setProp({...prop, title: e.target.value})}/>
                    <input className='price' type='number' placeholder='price' value={prop.price} onChange={(e) => setProp({...prop,  price: e.target.value})}/>
                    <input className='description' type='text' placeholder='description' value={prop.description} onChange={(e) => setProp({...prop, description: e.target.value})}/> 
                    <input className='image' type='text' placeholder='image' value={prop.image} onChange={(e) => setProp({...prop, image: e.target.value})}/>
                    <input className='category' type='text' placeholder='category' value={prop.category} onChange={(e) => setProp({...prop, category: e.target.value})}/>
                </div>
                
                {setApi ? <button className={style.btn} onClick={setApi}>add</button> : null}
           </div>
        </div>
    );
};

export default Card;