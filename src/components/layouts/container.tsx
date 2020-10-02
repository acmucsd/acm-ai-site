import React from 'react';
import './container.less';
function Container(props:any) {
  return(
    <div className='container'>
      <main className='content'>
        {props.children}
      </main>
    </div>
  )
}

export default Container;
