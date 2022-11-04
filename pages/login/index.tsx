import style from './index.module.scss'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import bg from '@assets/bg.png'

export default function IndexPage() {
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  const userNameChange = (val: string) => {
    setUserName(val)
  }

  const passwordChange = (val: string) => {
    setPassword(val)
  }

  const log = () => {
    router.push('/home')
  }

  return (
    <div className={style.loginWrapper}>
      <div className={style.bg}>
        <img src={bg.src} alt='' />
      </div>
      <div className={style.login}>
        <div className={style.title}>IUIUIUIUIU</div>
        <div className={style.inputWrapper}>
          <div className={style.inputTitle}>
            <UserOutlined className={style.icon} />
            User Name
          </div>
          <input
            className={style.input}
            type='text'
            value={userName}
            onChange={(e) => userNameChange(e.target.value)}
          />
        </div>
        <div className={style.inputWrapper}>
          <div className={style.inputTitle}>
            <LockOutlined className={style.icon} />
            password
          </div>
          <input
            className={style.input}
            value={password}
            type='password'
            onChange={(e) => passwordChange(e.target.value)}
          />
        </div>
        <div className={style.confirm} onClick={log}>
          Log in
        </div>
      </div>
    </div>
  )
}
