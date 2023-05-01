import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import Generator from 'fr-generator';
import { useRef, useState } from 'react'
import { Button ,Modal } from 'antd'

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const genRef = useRef()

  const getV = ()=>{
    const value = genRef.current && genRef.current.getValue()
    // console.log(JSON.toString(value),'11111111111111111')
    Modal.info({content:JSON.stringify(value)})
  }

  return (
    <PageContainer ghost>
      <Button onClick={getV}>获取表单JSON</Button>
      <div className={styles.container}>
        {/* <Guide name={trim(name)} /> */}
        <Generator getValue={(res:any)=>console.log(res)} 
          // transformer={}
          ref={genRef}
          defaultValue={{
          type:'object',
          properties:{
            inputName:{
              title:'简单输入',
              type:'string'
            }
          }
        }}></Generator>
      </div>
    </PageContainer>
  );
};

export default HomePage;
