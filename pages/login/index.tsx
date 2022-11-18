import style from './index.module.scss'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import bg from '@assets/bg.png'
import { fetchUserLogin } from '@api/user/login'
import { message } from 'antd'
import { fetchRegister } from '@api/user/register'
export default function IndexPage() {
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [loginShow, setLoginShow] = useState<boolean>(true)
  const router = useRouter()

  const userNameChange = (val: string) => {
    setUserName(val)
  }

  const passwordChange = (val: string) => {
    setPassword(val)
  }

  const confirmPasswordChange = (val: string) => {
    setConfirmPassword(val)
  }

  const clickBackHandler = () => {
    setLoginShow(true)
    setUserName('')
    setPassword('')
    setConfirmPassword('')
  }

  const goRegisterHandler = () => {
    setLoginShow(false)
    setUserName('')
    setPassword('')
    setConfirmPassword('')
  }

  const registerClickHandler = async () => {
    message.destroy()
    if (password !== confirmPassword) {
      message.error('两次输入密码不一致')
      return
    }
    const res = await fetchRegister({
      userName,
      password,
    })
    if (res.code === 200) {
      message.success('注册成功')
      setLoginShow(true)
      return
    }
    if (res.code === 400) {
      message.error(res.message)
    }
  }

  const login = async () => {
    message.destroy()
    const res = await fetchUserLogin({
      userName,
      password,
    })
    if (res.code === 200) {
      window.localStorage.setItem('img-token', res.data.token)
      message.success('登录成功')
      router.push('/home')
      return
    }
    if (res.code === 400) {
      message.error(res.message)
    }
  }

  return (
    <div className={style.loginWrapper}>
      <div className={style.bg}>
        <img src={bg.src} alt='' />
      </div>
      <div className={`${loginShow ? style.show : ''} ${style.login}`}>
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
            Password
          </div>
          <input
            className={style.input}
            value={password}
            type='password'
            onChange={(e) => passwordChange(e.target.value)}
          />
        </div>
        <div className={style.buttonWrapper}>
          <div className={`${style.first} ${style.button}`} onClick={login}>
            登录
          </div>
          <div className={style.button} onClick={goRegisterHandler}>
            注册
          </div>
        </div>
      </div>
      <div className={`${loginShow ? '' : style.show} ${style.login}`}>
        <div className={style.title}>注册</div>
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
            Password
          </div>
          <input
            className={style.input}
            value={password}
            type='password'
            onChange={(e) => passwordChange(e.target.value)}
          />
        </div>
        <div className={style.inputWrapper}>
          <div className={style.inputTitle}>
            <LockOutlined className={style.icon} />
            Confirm Password
          </div>
          <input
            className={style.input}
            value={confirmPassword}
            type='password'
            onChange={(e) => confirmPasswordChange(e.target.value)}
          />
        </div>
        <div className={style.buttonWrapper}>
          <div
            className={`${style.first} ${style.button}`}
            onClick={registerClickHandler}
          >
            注册
          </div>
          <div className={style.button} onClick={clickBackHandler}>
            返回
          </div>
        </div>
      </div>
    </div>
  )
}
