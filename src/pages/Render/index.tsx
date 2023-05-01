import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useState } from 'react'
import FormRender, { useForm } from 'form-render'
import { Modal } from 'antd'
// import styles from './index.less';
// import Generator from 'fr-generator';
const schema={"type":"object","labelWidth":120,"displayType":"row","properties":{"inputName":{"title":"简单输入","type":"string"},"input_MDwR9n":{"title":"输入框","type":"string","props":{}},"date_fcc2dT":{"title":"日期选择","type":"string","format":"date"},"checkbox_W62cHs":{"title":"是否选择","type":"boolean","widget":"checkbox"},"select_WEyxaT":{"title":"单选","type":"string","enum":["a","b","c"],"enumNames":["早","中","晚"],"widget":"select"},"multiSelect_aYSceV":{"title":"多选","description":"下拉多选","type":"array","items":{"type":"string"},"enum":["A","B","C","D"],"enumNames":["杭州","武汉","湖州","贵阳"],"widget":"multiSelect"},"checkboxes_BLbcZj":{"title":"多选","type":"array","widget":"checkboxes","items":{"type":"string"},"enum":["A","B","C","D"],"enumNames":["杭州","武汉","湖州","贵阳"]},"radio_InEoFp":{"title":"单选","type":"string","enum":["a","b","c"],"enumNames":["早","中","晚"],"widget":"radio"},"switch_0U2Mw3":{"title":"是否选择","type":"boolean","widget":"switch"},"number_Vfg734":{"title":"数字输入框","type":"number"},"something_P20PvF":{"title":"对象","description":"这是一个对象类型","type":"object","theme":"collapse","props":{"style":{}},"style":{},"properties":{"inputName":{"title":"简单输入框","type":"string"},"selectName":{"title":"单选","type":"string","enum":["a","b","c"],"enumNames":["早","中","晚"]},"dateName":{"title":"时间选择","type":"string","format":"date"},"listName":{"title":"对象数组","description":"对象数组嵌套功能","type":"array","items":{"type":"object","properties":{"rangeName":{"title":"日期/时间范围","type":"range","format":"date","props":{"placeholder":["开始日期","结束日期"]}}}}}}}}}
const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const [formConfig,setFormConfig]=useState({})
  const form = useForm()

  const getFormConfig = ()=>{

  }
  return (
    <PageContainer ghost>
      <FormRender
        form={form}
        schema={schema}
        footer={true}
        onFinish={(form)=>Modal.info({content:JSON.stringify(form)})}
      ></FormRender>
    </PageContainer>
  );
};

export default HomePage;
