import style from './index.module.scss'
import { Form, Select, Upload, Button, Drawer, message } from 'antd'
import { ProjectNameList } from '@interface/common'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { fetchGetProjectNameList } from '@api/project/projectNameList'
import { useState, useEffect } from 'react'
import { fetchAddFile } from '@api/file/addFile'
export default function FileDrawer(props: any) {
  const { fileShow, hideFile, edit } = props
  const [ownerNameList, setOwnerNameList] = useState<ProjectNameList>([])
  const [fileForm] = Form.useForm()

  const { Dragger } = Upload

  const fileProps: UploadProps = {
    name: 'file',
    multiple: true,
    listType: 'picture',
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
      }
      if (status === 'done') {
        console.log(info.file)
      } else if (status === 'error') {
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {
    try {
      const res = await fetchGetProjectNameList(true)
      setOwnerNameList(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const submit = async () => {
    const {
      projectName,
      fileList: { fileList },
    } = fileForm.getFieldsValue()
    if (!projectName) {
      message.warning('请选择项目')
    }
    console.log(projectName, fileList)
    const res = await fetchAddFile({ projectName, fileList })
    if (res.code === 200) {
      message.success(res.message)
      hideFile()
    } else {
      message.error(res.message)
    }
  }

  return (
    <Drawer
      title={
        edit ? (
          <div className={style.drawerWrapper}>
            替换文件
            <Button type='primary' onClick={submit}>
              提交
            </Button>
          </div>
        ) : (
          <div className={style.drawerWrapper}>
            新增文件
            <Button type='primary' onClick={submit}>
              提交
            </Button>
          </div>
        )
      }
      placement='right'
      onClose={hideFile}
      open={fileShow}
      width={450}
    >
      <Form name='file' form={fileForm}>
        <Form.Item required={true} label='项目' name='projectName'>
          <Select
            placeholder='请选择'
            showSearch
            allowClear
            optionFilterProp='children'
          >
            {!!ownerNameList &&
              ownerNameList.map((item) => (
                <Select.Option key={item.id} value={item.projectName}>
                  {item.projectName}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          required={true}
          label='文件'
          name='fileList'
        >
          <Dragger {...fileProps}>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>单击或拖拽文件到此处上传</p>
            <p className='ant-upload-hint'>tips:支持上传：</p>
          </Dragger>
        </Form.Item>
      </Form>
    </Drawer>
  )
}
