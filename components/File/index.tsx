import style from './index.module.scss'
import {
  Form,
  Input,
  Select,
  Col,
  Button,
  Table,
  message,
  Image,
  Drawer,
} from 'antd'
import copy from 'copy-to-clipboard'
import { FileList, ProjectNameList, IFileListItem } from '@interface/common'
import type { ColumnsType } from 'antd/es/table'
import { fetchGetProjectNameList } from '@api/project/projectNameList'
import { useState, useEffect } from 'react'
import FileDrawer from '@components/FileDrawer'
import { fetchGetFileList } from '@api/file/fileList'

export default function File() {
  const [edit, setEdit] = useState<boolean>(false)
  const [current, setCurrent] = useState<number>(1)
  const [fileList, setFileList] = useState<FileList>([])
  const [projectNameList, setProjectNameList] = useState<ProjectNameList>([])
  const [fileShow, setFileShow] = useState<boolean>(false)
  const [imgVisible, setImgVisible] = useState<boolean>(false)
  const [imgUrl, setImgUrl] = useState<string>('')
  const [drawerFile, setDrawerFile] = useState<any>(null)
  const [total, setTotal] = useState<number>(0)
  const [oldImgId, setOldImgId] = useState<number>(-1)
  const [drawerProjectName, setDrawerProjectName] = useState<string | null>('')
  const [form] = Form.useForm()

  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {
    try {
      const initData = await Promise.all([
        fetchGetProjectNameList(),
        fetchGetFileList(),
      ])
      setProjectNameList(initData[0].data)
      setFileList(initData[1].data.list)
      setTotal(initData[1].data.total)
    } catch (err) {
      console.log(err)
    }
  }

  const hideFile = () => {
    setFileShow(false)
  }

  const showFile = (
    projectName = '',
    fileUrl?: string,
    fileName?: string,
    id?: number
  ) => {
    if (fileUrl && fileName && id) {
      setEdit(true)
      setDrawerFile({
        fileUrl,
        fileName,
      })
      setOldImgId(id)
      setDrawerProjectName(projectName)
    } else {
      setEdit(false)
      setDrawerProjectName(null)
      setOldImgId(-1)
    }
    setFileShow(true)
  }

  const searchFile = async () => {
    const res = await fetchGetFileList({
      ...form.getFieldsValue(),
      pageSize: 10,
      page: current,
    })
    if (res.code === 200) {
      setFileList(res.data.list)
      setTotal(res.data.total)
      message.success(res.message)
      return
    }
    message.error(res.message)
  }

  const updateFile = async (page?: number) => {
    setCurrent(page || current)
    try {
      const res = await fetchGetFileList({
        pageSize: 10,
        page: page || current,
      })
      setFileList(res.data.list)
      setTotal(res.data.total)
    } catch (e) {
      console.log(e)
    }
  }

  const showImg = (fileUrl: string) => {
    setImgVisible(true)
    setImgUrl(fileUrl)
  }

  const copyFileUrl = (fileUrl: string) => {
    message.destroy()
    copy(fileUrl)
      ? message.success('复制成功')
      : message.error('复制失败,请重试')
  }

  const columns: ColumnsType<IFileListItem> = [
    {
      title: '文件名称',
      width: 150,
      dataIndex: 'fileName',
      key: 'fileName',
      fixed: 'left',
      render: (text, { fileUrl }) => (
        <div onClick={() => showImg(fileUrl)} className={style.fileOperate}>
          {text}
        </div>
      ),
    },
    {
      title: '文件类型',
      width: 150,
      dataIndex: 'fileType',
      key: 'fileType',
    },
    {
      title: '创建时间',
      width: 150,
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
      fixed: 'right',
      render: (text, { id, isParticipate, projectName, fileUrl, fileName }) => (
        <div className={style.fileOperate}>
          <span
            onClick={() => showFile(projectName, fileUrl, fileName, id)}
            className={style.update}
          >
            {isParticipate ? '替换' : ''}
          </span>
          <span onClick={() => copyFileUrl(fileUrl)} className={style.copy}>
            复制链接
          </span>
        </div>
      ),
    },
  ]

  return (
    <div className={style.fileWrapper}>
      <Image
        width={200}
        style={{ display: 'none' }}
        src={imgUrl}
        preview={{
          visible: imgVisible,
          src: imgUrl,
          onVisibleChange: (value) => {
            setImgVisible(value)
          },
        }}
      />
      <FileDrawer
        oldImgId={oldImgId}
        updateFile={updateFile}
        drawerFile={drawerFile}
        drawerProjectName={drawerProjectName}
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
              <Form.Item
                label='创建人'
                name='creatorName'
                labelCol={{ offset: 0 }}
              >
                <Input allowClear placeholder='请输入'></Input>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ offset: 0 }}
                label='修改人'
                name='editorName'
              >
                <Input allowClear placeholder='请输入'></Input>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item>
                <Button onClick={searchFile} type='primary' htmlType='submit'>
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
          <Button type='primary' onClick={() => showFile()}>
            新增
          </Button>
        </div>
        <Table
          pagination={{
            total,
            current: current,
            onChange: (page) => updateFile(page),
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
