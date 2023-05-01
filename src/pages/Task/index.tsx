import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import Generator from 'fr-generator';
import { Button ,Modal,Input,Spin } from 'antd';
import { queryTask,completeTask ,taskAssign,suspendTask,unsuspendTask,forwardTask} from '@/services/index'
import React, { useEffect, useState } from 'react';
import { Radio, Space, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import FormRender, { useForm } from 'form-render'
const { Search } = Input;


const createFormConfig = {"type":"object","labelWidth":120,"displayType":"row","properties":{"name":{"title":"任务名称","type":"string","required":true,"props":{}},"checkRule":{"title":"完成条件","type":"string","enum":["percentage"],"enumNames":["按照百分比"],"widget":"select","default":"percentage"},"threshold":{"title":"百分比","type":"number","widget":"slider","default":100},"allocator":{"title":"分配方式","type":"string","enum":["serial","parallel"],"enumNames":["顺序","并发"],"widget":"select","default":"serial"},"order":{"title":"顺序","description":"多选","type":"array","items":{"type":"string"},"enum":["015754","011114","012901","011330"],"enumNames":["015754","011114","012901","011330"],"widget":"multiSelect","required":true}},"executors":{"title":"执行人","description":"多选","type":"array","items":{"type":"string"},"enum":["015754","011114","012901","011330"],"enumNames":["015754","011114","012901","011330"],"widget":"multiSelect","required":true}}
const forwardFormConfig={"type":"object","labelWidth":120,"displayType":"row","properties":{"executor":{"title":"执行人","description":"","type":"string","items":{"type":"string"},"enum":["015754","011114","012901","011330"],"enumNames":["015754","011114","012901","011330"],"widget":"select","required":true}}}
let forwardTaskId = ''
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
  taskId:string;
  executionStatus:string
}

type TablePaginationPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight';



const App: React.FC = () => {
  const [top, setTop] = useState<TablePaginationPosition>('topLeft');
  const [bottom, setBottom] = useState<TablePaginationPosition>('bottomRight');
  const [data, setData]=useState([])
  const [userId,setUserId]=useState('015754')
  const [isModalOpen, setIsModalOpen]=useState(false)
  const [forwardModalOpen, setForwardModalOpen]=useState(false)
  const [spinning, setspinning]=useState(false)
  const createForm = useForm()
  const forwardForm = useForm()

  useEffect(()=>{
    getTask()
  },[])
  
  const columns: ColumnsType<DataType> = [
    {
      title: '任务ID',
      dataIndex: 'taskId',
      key: 'taskId',
      render: (text) => <a>{text}</a>,
    },{
      title: '执行ID',
      dataIndex: 'executionId',
      key: 'executionId',
      render: (text) => <a>{text}</a>,
    },{
      title: '执行状态',
      dataIndex: 'executionStatus',
      key: 'executionStatus',
      render: (text) => <a>{text}</a>,
    },{
      title: '执行人',
      dataIndex: 'executor',
      key: 'executor',
      render: (text) => <a>{text}</a>,
    },{
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (text) => <a>{text}</a>,
    },{
      title: '标题',
      dataIndex: 'taskName',
      key: 'taskName',
      render: (text) => <a>{text}</a>,
    },{
      title: '状态',
      dataIndex: 'taskStatus',
      key: 'taskStatus',
      render: (text) => <a>{text}</a>,
    },{
      title: '操作',
      dataIndex: 'taskStatus',
      key: 'taskStatus',
      render: (text,row) => <div>
        <Button type='link' onClick={()=>message.info('建设中...')}>查看</Button>
        {row.executionStatus=='EXECUTING'?<Button type="link" onClick={()=>suspend({taskId:row?.taskId})}>搁置</Button>:''}
        {row.executionStatus=='SUSPENDED'?<Button type="link" onClick={()=>unsuspend({taskId:row?.taskId})}>取消搁置</Button>:''}
        {row.executionStatus=='EXECUTING'?<Button type='link' onClick={()=>complete({taskId:row?.taskId})}>完成</Button>:''}
        {/* <Button type='link' onClick={()=>message.info('建设中...')}>分配</Button> */}
        {row.executionStatus=='EXECUTING'?<Button type='link' onClick={()=>{
          setForwardModalOpen(true)
          forwardTaskId=row?.taskId
          }}>转办</Button>:""}
        </div>,
    }
    
  ];

  const complete =async (query:any) => {
    let res = await completeTask({
      taskId:query.taskId,
      executor:userId
    })
    console.log(res)
    if(res){
      message.error(JSON.stringify(res?.statusText))
    }
    getTask()
  }


  const suspend =async (query:any) => {
    let res = await suspendTask({
      taskId:query.taskId,
      executor:userId
    })
    if(res){
      message.error(JSON.stringify(res?.statusText))
    }
    getTask()
  }

  const unsuspend =async (query:any) => {
    let res = await unsuspendTask({
      taskId:query.taskId,
      executor:userId
    })
    if(res){
      message.error(JSON.stringify(res?.statusText))
    }
    getTask()
  }

  const forward =async (query:any) => {
    let res = await forwardTask({
      taskId:query.taskId,
      executor:userId
    })
    if(res){
      message.error(JSON.stringify(res?.statusText))
    }
    getTask()
  }

  const getTask = async ()=>{
    setspinning(true)
    let response = await queryTask({
      executor:userId
    })
    setspinning(false)
    setData(response)
    
  }

  const handleOkCreate = async (form:any)=>{

    let newForm = JSON.parse(JSON.stringify(form))
    if(newForm.threshold){
      newForm.threshold = newForm.threshold/100
    }
    
    let res = await taskAssign({...newForm,zeebeJobKey:-1})
    if (res){

    }
    setIsModalOpen(false)
    getTask()
  }


  const handleOkForward = async (form:any,)=>{

    let newForm = JSON.parse(JSON.stringify(form))
    let res = await forwardTask({...newForm,taskId:forwardTaskId})
    if (res){
      message.error(JSON.stringify(res?.statusText))
    }
    setForwardModalOpen(false)
    getTask()
  }

  const handleCancel=()=>{
    setIsModalOpen(false)
  }

  
  return (
    <div>
      {/* <Spin spinning={spinning}/> */}
      <div>当前用户: {userId}</div>
      <Search style={{ width: 304 }} value={userId} onChange={(e)=>setUserId(e.target.value)} enterButton="切换用户" onSearch={getTask}></Search>
      <Button onClick={getTask}>刷新列表</Button>

        <Button className={styles.createLink} type='link' onClick={()=>setIsModalOpen(true)}>创建任务</Button>
      <Table columns={columns} pagination={{ position: [ bottom] }} dataSource={data} />
      <Modal title="创建任务" closable={true} onCancel={()=>setIsModalOpen(false)} visible={isModalOpen} footer={null}>
        <FormRender
          form={createForm}
          schema={createFormConfig}
          footer={true}
          onFinish={(form)=>handleOkCreate(form)}
        ></FormRender>
      </Modal>
      <Modal title="转办任务" closable={true} onCancel={()=>{
        setForwardModalOpen(false)
        forwardTaskId=''
        }} visible={forwardModalOpen} footer={null}>
        <FormRender
          form={forwardForm}
          schema={forwardFormConfig}
          footer={true}
          onFinish={(form)=>handleOkForward(form)}
        ></FormRender>
      </Modal>
    </div>
  );
};

export default App;