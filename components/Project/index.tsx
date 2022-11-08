import style from './index.module.scss'
import { Form, Input, Select, Col, Button } from 'antd'

export default function Project() {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={style.projectWrapper}>
      <div className={style.searchWrapper}>
        <div className={style.searchTitle}>查询条件</div>
        <div className={style.formWrapper}>
          <Form
            name='basic'
            initialValues={{ remember: true }}
            layout='inline'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            colon
          >
            <Col span={5}>
              <Form.Item label='项目名称' name='projectName'>
                <Select
                  placeholder='请选择'
                  showSearch
                  allowClear
                  optionFilterProp='children'
                >
                  <Select.Option value='demo'>Demo</Select.Option>
                  <Select.Option value='111'>pppp</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label='创建人' name='creator' labelCol={{ offset: 0 }}>
                <Input allowClear placeholder='请输入'></Input>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item labelCol={{ offset: 0 }} label='修改人' name='editor'>
                <Input allowClear placeholder='请输入'></Input>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  查询
                </Button>
              </Form.Item>
            </Col>
          </Form>
        </div>
      </div>
    </div>
  )
}
