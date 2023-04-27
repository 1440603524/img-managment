import style from './index.module.scss'
import type { MenuProps } from 'antd'
import { Menu, Button, Dropdown, message } from 'antd'
import { ReactNode, Key, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  ProjectOutlined,
  RightOutlined,
} from '@ant-design/icons'
type MenuItem = Required<MenuProps>['items'][number]

export default function Nav(props: any) {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const router = useRouter()

  const getItem = (itemProp: {
    label: ReactNode
    key: Key
    icon?: ReactNode
    children?: MenuItem[]
    type?: 'group'
  }): MenuItem => {
    const { label, key, icon, children, type } = itemProp
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem
  }

  const items: MenuItem[] = [
    getItem({
      label: <div className={style.title}>文件管理平台</div>,
      key: '',
      children: [
        getItem({ label: '首页', key: 'home', icon: <HomeOutlined /> }),
        getItem({
          label: '项目管理',
          key: 'project',
          icon: <ProjectOutlined />,
        }),
        getItem({
          label: '文件管理',
          key: 'file',
          icon: <FolderOpenOutlined />,
        }),
      ],
      type: 'group',
    }),
  ]

  const dropdownMenu: MenuItem[] = [
    getItem({ label: '编辑', key: 'editor' }),
    getItem({ label: '退出', key: 'logout' }),
  ]

  const menuClickHandler = (key: string) => {
    router.push(`/${key}`)
  }

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const logOutSelectHandler = (key: string) => {
    if (key === 'logout') {
      localStorage.removeItem('img-token')
      router.push('/login')
      message.info('退出登录')
    } else if (key === 'editor') {
      router.push('/editor')
    }
  }

  const getDefaultSelectedKeys = useMemo(() => {
    const menu = ['home', 'file', 'project']
    return [menu[menu.findIndex((item) => router.asPath.includes(item))]]
  }, [router.asPath])

  return (
    <div className={style.NavWrapper}>
      <Menu
        defaultSelectedKeys={getDefaultSelectedKeys}
        mode='inline'
        theme='light'
        items={items}
        inlineCollapsed={collapsed}
        style={{ width: collapsed ? '80px' : '250px' }}
        onClick={(item) => menuClickHandler(item.key)}
      />
      <div className={style.rightBox}>
        <div className={style.headerWrapper}>
          <Button type='primary' onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <div className={style.user}>
            欢迎您，<span className={style.userName}>{props.userName}</span>
            <Dropdown
              overlayClassName={style.dropdownMenu}
              menu={{
                items: dropdownMenu,
                onClick: (item) => logOutSelectHandler(item.key),
              }}
              placement='bottomLeft'
            >
              <RightOutlined className={style.arrow} />
            </Dropdown>
          </div>
        </div>
        <div className={style.contentWrapper}>
          <div className={style.content}>{props.children}</div>
        </div>
      </div>
    </div>
  )
}
