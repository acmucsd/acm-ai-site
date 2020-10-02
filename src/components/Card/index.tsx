import * as React from 'react';
import './index.less';
import {Card as AntdCard} from 'antd';

export function Card(props: any) {
  return (
    <div className='Card'>
    <AntdCard {...props}>
      {props.children}
    </AntdCard>
    </div>
  )
}
export default Card
