import style from './index.module.scss'
import { Form, Input, Select, Col, Button, Table, message, Drawer } from 'antd'
import { FileList, ProjectNameList, IFileListItem } from '@interface/common'
import type { ColumnsType } from 'antd/es/table'
import { fetchGetProjectNameList } from '@api/project/projectNameList'
import { useState, useEffect } from 'react'
import FileDrawer from '@components/FileDrawer'

export default function File() {
  const [edit, setEdit] = useState<boolean>(false)
  const [current, setCurrent] = useState<number>(1)
  const [fileList, setFileList] = useState<FileList>([])
  const [projectNameList, setProjectNameList] = useState<ProjectNameList>([])
  const [fileShow, setFileShow] = useState<boolean>(false)
  const [form] = Form.useForm()

  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {
    try {
      const initData = await Promise.all([fetchGetProjectNameList()])
      setProjectNameList(initData[0].data)
    } catch (err) {
      console.log(err)
    }
  }

  const hideFile = () => {
    setFileShow(false)
  }

  const showFile = () => {
    setFileShow(true)
  }

  const columns: ColumnsType<IFileListItem> = [
    {
      title: '文件名称',
      width: 150,
      dataIndex: 'fileName',
      key: 'fileName',
      fixed: 'left',
    },
    {
      title: '文件类型',
      width: 150,
      dataIndex: 'fileType',
      key: 'fileType',
    },
    {
      title: '创建时间',
      width: 130,
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: '文件创建人',
      width: 130,
      dataIndex: 'creatorName',
      key: 'creatorName',
    },
    {
      title: '修改时间',
      width: 120,
      dataIndex: 'updateAt',
      key: 'updateAt',
    },
    {
      title: '文件修改人',
      width: 120,
      dataIndex: 'editorName',
      key: 'editorName',
    },
    {
      title: '项目名字',
      width: 120,
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: '操作',
      width: 120,
      dataIndex: 'operate',
      key: 'operate',
    },
  ]

  return (
    <div className={style.fileWrapper}>
      <FileDrawer
        fileShow={fileShow}
        hideFile={hideFile}
        edit={edit}
      ></FileDrawer>
      <div className={style.searchWrapper}>
        <div className={style.searchTitle}>查询条件</div>
        <div className={style.formWrapper}>
          <Form form={form} name='fileList' layout='inline'>
            <Col span={4}>
              <Form.Item label='项目名称' name='projectName'>
                <Select
                  placeholder='请选择'
                  showSearch
                  allowClear
                  optionFilterProp='children'
                >
                  {!!projectNameList &&
                    projectNameList.map((item) => (
                      <Select.Option key={item.id} value={item.projectName}>
                        {item.projectName}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ offset: 0 }}
                label='文件名称'
                name='fileName'
              >
                <Input allowClear placeholder='请输入'></Input>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label='创建人' name='creator' labelCol={{ offset: 0 }}>
                <Input allowClear placeholder='请输入'></Input>
              </Form.Item>
            </Col>
            <Col span={6}>
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
      <div className={style.tableWrapper}>
        <div className={style.tableTitle}>
          <div>文件列表</div>
          <Button type='primary' onClick={showFile}>
            新增
          </Button>
        </div>
        <Table
          pagination={{
            total: projectNameList.length,
            current: current,
          }}
          rowKey={(record) => record.id}
          scroll={{ x: 'max-content' }}
          columns={columns}
          dataSource={fileList}
          bordered
        />
      </div>
    </div>
  )
}
