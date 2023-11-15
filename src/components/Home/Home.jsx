import React, { useContext } from 'react';
// import style from './Home.module.css';
import { CounterContext } from '../../Context/CounterContext';


export default function Home () {
  

  let {changeCounter} = useContext(CounterContext);
    return <>

    <button onClick={()=>changeCounter()} className='btn btn-info'>change</button>
          <h1>Home</h1>
            
        </>
}
