import style from './index.module.scss'
import {
  Form,
  Input,
  Select,
  Col,
  Button,
  Table,
  Modal,
  message,
  Popconfirm,
  Drawer,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useRouter } from 'next/router'
import {
  ProjectList,
  ProjectNameList,
  IProjectListItem,
  MemberList,
  IMemberListItem,
} from '@interface/common'
import { useState, useEffect } from 'react'
import { fetchAddProject } from '@api/project/addProject'
import { fetchGetProjectNameList } from '@api/project/projectNameList'
import { fetchGetProjectList } from '@api/project/projectList'
import { fetchEditProject } from '@api/project/editProject'
import { fetchDeleteProject } from '@api/project/deleteProject'
import { fetchGetMemberList } from '@api/member/memberList'
import { fetchAddMember } from '@api/member/addMember'
import { fetchDeleteMember } from '@api/member/deleteMember'
import { fetchSearchMember } from '@api/member/findMember'

export default function Project() {
  const router = useRouter()
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [projectName, setProjectName] = useState<string>('')
  const [projectId, setProjectId] = useState<number>(0)
  const [projectDesc, setProjectDesc] = useState<string>('')
  const [projectNameList, setProjectNameList] = useState<ProjectNameList>([])
  const [projectList, setProjectList] = useState<ProjectList>([])
  const [edit, setEdit] = useState<boolean>(false)
  const [current, setCurrent] = useState<number>(1)
  const [memberShow, setMemberShow] = useState<boolean>(false)
  const [memberName, setMemberName] = useState<string>('')
  const [memberList, setMemberList] = useState<MemberList>([])
  const [memberCurrent, setMemberCurrent] = useState<number>(1)
  const [form] = Form.useForm()

  useEffect(() => {
    initData()
  }, [])

  const checkFile = () => {
    router.push('/file')
  }

  const editProject = (
    projectId: number,
    projectName: string,
    projectDesc: string
  ) => {
    setProjectName(projectName)
    setProjectDesc(projectDesc)
    setProjectId(projectId)
    setEdit(true)
    showModal()
  }

  const deleteProject = async (id: number) => {
    const res = await fetchDeleteProject({ id })
    if (res.code === 200) {
      message.success(res.message)
      getProjectList(current)
    } else {
      message.error(res.message)
    }
  }

  const addMember = async (id: number, memberName: string) => {
    const res = await fetchAddMember({ projectId, memberId: id, memberName })
    const list = await fetchGetMemberList({
      pageSize: 10,
      page: 1,
      projectId,
    })
    if (list.code === 200 && res.code === 200) {
      setMemberList(list.data)
      message.success('????????????')
    } else {
      message.error('????????????')
    }
  }

  const deleteMember = async (id: number) => {
    const res = await fetchDeleteMember({ projectId, memberId: id })
    const list = await fetchGetMemberList({
      pageSize: 10,
      page: 1,
      projectId,
    })
    if (list.code === 200 && res.code === 200) {
      setMemberList(list.data)
      message.success('????????????')
    } else {
      message.error('????????????')
    }
  }

  const searchMember = async () => {
    if (memberName === '') {
      getMemberList(projectId)
      message.success('????????????')
      return
    }
    const res = await fetchSearchMember({ memberName, projectId })
    if (res.code === 200) {
      setMemberList([res.data])
      message.success(res.message)
      return
    }
    message.error(res.message)
  }

  const columns: ColumnsType<IProjectListItem> = [
    {
      title: '????????????',
      width: 150,
      dataIndex: 'projectName',
      key: 'projectName',
      fixed: 'left',
    },
    {
      title: '????????????',
      width: 150,
      dataIndex: 'projectDesc',
      key: 'projectDesc',
    },
    {
      title: '???????????????',
      width: 130,
      dataIndex: 'ownerName',
      key: 'ownerName',
    },
    {
      title: '???????????????',
      width: 130,
      dataIndex: 'editorName',
      key: 'editorName',
    },
    {
      title: '??????????????????',
      width: 120,
      dataIndex: 'updateAt',
      key: 'updateAt',
    },
    {
      title: '??????',
      width: 170,
      key: 'operation',
      fixed: 'right',
      render: (text, { id, projectName, projectDesc, isOwner }) => (
        <>
          {isOwner ? (
            <div>
              <span
                onClick={() => editProject(id, projectName, projectDesc)}
                className={style.checkFile}
              >
                ??????
              </span>

              <Popconfirm
                title='????????????????????????'
                okText='??????'
                cancelText='??????'
                onConfirm={() => deleteProject(id)}
              >
                <span className={style.checkFile}>??????</span>
              </Popconfirm>
              <span onClick={() => showMember(id)} className={style.checkFile}>
                ????????????
              </span>
              <span onClick={checkFile} className={style.checkFile}>
                ????????????
              </span>
            </div>
          ) : (
            <span onClick={checkFile} className={style.checkFile}>
              ????????????
            </span>
          )}
        </>
      ),
    },
  ]

  const memberColumns: ColumnsType<IMemberListItem> = [
    {
      title: '?????????',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '??????',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <div>{!!text ? '???????????????' : '???????????????'}</div>,
    },
    {
      title: '??????',
      key: 'operate',
      render: (text, { id, status, userName }) => (
        <>
          {!!status ? (
            <Popconfirm
              title='????????????????????????'
              okText='??????'
              cancelText='??????'
              onConfirm={() => deleteMember(id)}
            >
              <span className={style.checkFile}>??????</span>
            </Popconfirm>
          ) : (
            <Popconfirm
              onConfirm={() => addMember(id, userName)}
              title='??????????????????'
              okText='??????'
              cancelText='??????'
            >
              <span className={style.checkFile}>??????</span>
            </Popconfirm>
          )}
        </>
      ),
    },
  ]

  const initData = async () => {
    try {
      const initData = await Promise.all([
        fetchGetProjectNameList(),
        fetchGetProjectList(),
      ])
      setProjectNameList(initData[0].data)
      setProjectList(initData[1].data)
    } catch (err) {
      console.log(err)
    }
  }

  const showModal = () => {
    setModalShow(true)
  }

  const handleCancel = () => {
    setModalShow(false)
    setEdit(false)
    setProjectName('')
    setProjectDesc('')
  }

  const handleOk = async () => {
    message.destroy()
    if (projectName === '') {
      message.error('?????????????????????')
      return
    }
    if (edit) {
      const res = await fetchEditProject({
        id: projectId,
        projectName,
        projectDesc,
      })
      if (res.code === 400) {
        message.error(res.message)
        return
      }
      if (res.code === 200) {
        message.success(res.message)
        getProjectList(current)
        handleCancel()
      }
    } else {
      const res = await fetchAddProject({
        projectName,
        projectDesc,
      })
      if (res.code === 400) {
        message.error(res.message)
        return
      }
      if (res.code === 200) {
        message.success(res.message)
        getProjectList(current)
        handleCancel()
      }
    }
    try {
      const nameListRes = await fetchGetProjectNameList()
      setProjectNameList(nameListRes.data)
    } catch (e) {
      console.log(e)
    }
  }

  const projectNameChange = (val: string) => {
    setProjectName(val)
  }

  const projectDescChange = (val: string) => {
    setProjectDesc(val)
  }

  const getProjectList = async (page = 1) => {
    const res = await fetchGetProjectList({ page, pageSize: 10 })
    setCurrent(page)
    if (res.code === 200) {
      setProjectList(res.data)
      return
    }
    if (res.code === 400) {
      message.error(res.message)
    }
  }

  const searchProjectHandler = async () => {
    const {
      projectName,
      editorName = '',
      ownerName = '',
    } = form.getFieldsValue()
    const res = await fetchGetProjectList({
      projectName,
      editorName,
      ownerName,
      page: current,
      pageSize: 10,
    })
    if (res.code === 200) {
      setProjectList(res.data)
      message.success(res.message)
    } else {
      message.error(res.message)
    }
  }

  const hideMember = () => {
    setMemberShow(false)
  }

  const showMember = (id: number) => {
    setMemberShow(true)
    setProjectId(id)
    getMemberList(id)
  }

  const getMemberList = async (
    id: number,
    page: number = 1,
    pageSize: number = 10
  ) => {
    setMemberCurrent(page)
    const res = await fetchGetMemberList({
      pageSize,
      page,
      projectId: id,
    })
    setMemberList(res.data)
  }

  const memberNameInputHandler = (val: string) => {
    setMemberName(val)
  }

  return (
    <div className={style.projectWrapper}>
      <Modal
        title={edit ? '????????????' : '????????????'}
        open={modalShow}
        okText='??????'
        cancelText='??????'
        keyboard={false}
        maskClosable={false}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={style.projectName}>
          <Input
            placeholder='????????????'
            value={projectName}
            onChange={(e) => projectNameChange(e.target.value)}
            allowClear
          ></Input>
        </div>
        <div className={style.projectDesc}>
          <Input
            placeholder='????????????'
            value={projectDesc}
            onChange={(e) => projectDescChange(e.target.value)}
            allowClear
          ></Input>
        </div>
      </Modal>
      <Drawer
        title='????????????'
        placement='right'
        onClose={hideMember}
        open={memberShow}
      >
        <div className={style.drawer}>
          <Input
            value={memberName}
            placeholder={'?????????????????????'}
            onChange={(e) => memberNameInputHandler(e.target.value)}
          ></Input>
          <Button
            onClick={() => {
              searchMember()
            }}
            type='primary'
          >
            ??????
          </Button>
        </div>
        <Table
          pagination={{
            total: memberList.length,
            current: memberCurrent,
            onChange: (page) => getMemberList(projectId, page),
          }}
          rowKey={(record) => record.id}
          scroll={{ x: 'max-content' }}
          columns={memberColumns}
          dataSource={memberList}
          bordered
        />
      </Drawer>
      <div className={style.searchWrapper}>
        <div className={style.searchTitle}>????????????</div>
        <div className={style.formWrapper}>
          <Form
            form={form}
            name='projectSearch'
            initialValues={{ remember: true }}
            layout='inline'
            colon
          >
            <Col span={5}>
              <Form.Item label='????????????' name='projectName'>
                <Select
                  placeholder='?????????'
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
            <Col span={7}>
              <Form.Item
                label='?????????'
                name='ownerName'
                labelCol={{ offset: 0 }}
              >
                <Input allowClear placeholder='?????????'></Input>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                labelCol={{ offset: 0 }}
                label='?????????'
                name='editorName'
              >
                <Input allowClear placeholder='?????????'></Input>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item>
                <Button
                  onClick={searchProjectHandler}
                  type='primary'
                  htmlType='submit'
                >
                  ??????
                </Button>
              </Form.Item>
            </Col>
          </Form>
        </div>
      </div>
      <div className={style.tableWrapper}>
        <div className={style.tableTitle}>
          <div>????????????</div>
          <Button type='primary' onClick={showModal}>
            ??????
          </Button>
        </div>
        <Table
          pagination={{
            total: projectNameList.length,
            current: current,
            onChange: (page) => getProjectList(page),
          }}
          rowKey={(record) => record.id}
          scroll={{ x: 'max-content' }}
          columns={columns}
          dataSource={projectList}
          bordered
        />
      </div>
    </div>
  )
}
