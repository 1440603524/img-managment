import style from './index.module.scss'
import { Form, Select, Upload, Button, Drawer, message } from 'antd'
import { ProjectNameList } from '@interface/common'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { fetchGetProjectNameList } from '@api/project/projectNameList'
import { useState, useEffect } from 'react'
import { fetchAddFile } from '@api/file/addFile'
import { fetchUpdateFile } from '@api/file/updateFile'
export default function FileDrawer(props: any) {
  const {
    fileShow,
    hideFile,
    edit,
    drawerProjectName,
    drawerFile,
    updateFile,
    oldImgId,
  } = props
  const [ownerNameList, setOwnerNameList] = useState<ProjectNameList>([])
  const [fileList, setFileList] = useState<any>([])
  const [form] = Form.useForm()

  const { Dragger } = Upload

  const fileProps: UploadProps = {
    name: 'file',
    multiple: true,
    listType: 'picture',
    fileList: fileList,
    onChange(info) {
      const { status } = info.file
      const { fileList } = info
      if (status !== 'uploading') {
      }
      if (status === 'done') {
        console.log(info.file)
      } else if (status === 'error') {
      }
      setFileList([...fileList])
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  useEffect(() => {
    initData()
  }, [])

  useEffect(() => {
    form.setFieldValue('projectName', drawerProjectName)
  }, [drawerProjectName])

  useEffect(() => {
    setFileList(
      drawerFile
        ? [
            {
              name: drawerFile.fileName,
              status: 'done',
              thumbUrl: drawerFile.fileUrl,
            },
          ]
        : []
    )
  }, [drawerFile])

  useEffect(() => {
    if (!fileShow) {
      setFileList([])
    }
  }, [fileShow])

  const initData = async () => {
    try {
      const res = await fetchGetProjectNameList(true)
      setOwnerNameList(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const submit = async () => {
    const { projectName, file } = form.getFieldsValue()
    if (!projectName) {
      message.warning('???????????????')
      return
    }
    if (
      !file ||
      file.fileList[file.fileList.length - 1].thumbUrl.startsWith('https')
    ) {
      message.warning('??????????????????')
      return
    }
    if (edit) {
      const res = await fetchUpdateFile({
        projectName,
        file: file.fileList[file.fileList.length - 1],
        id: oldImgId,
      })
      if (res.code === 400) {
        message.error(res.message)
        return
      }
      message.success(res.message)
      hideFile()
      updateFile()
      return
    }
    const { fileList } = file
    const res = await fetchAddFile({ projectName, fileList })
    if (res.code === 200) {
      message.success(res.message)
      hideFile()
      updateFile()
    } else {
      message.error(res.message)
    }
  }

  return (
    <Drawer
      title={
        edit ? (
          <div className={style.drawerWrapper}>
            ????????????
            <Button type='primary' onClick={submit}>
              ??????
            </Button>
          </div>
        ) : (
          <div className={style.drawerWrapper}>
            ????????????
            <Button type='primary' onClick={submit}>
              ??????
            </Button>
          </div>
        )
      }
      placement='right'
      onClose={hideFile}
      open={fileShow}
      width={450}
    >
      <Form name='file' form={form}>
        <Form.Item required={true} label='??????' name='projectName'>
          <Select
            placeholder='?????????'
            showSearch
            allowClear
            disabled={!!drawerProjectName}
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
          label='??????'
          name='file'
        >
          <Dragger {...fileProps}>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>????????????????????????????????????</p>
            <p className='ant-upload-hint'>tips:???????????????</p>
          </Dragger>
        </Form.Item>
      </Form>
    </Drawer>
  )
}
