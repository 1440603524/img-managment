import { useEffect, useState } from 'react'
import style from './index.module.scss'
import Nav from '@components/Nav'

export default function PageWrapper(props: any) {
  const [userName, setUserName] = useState<string>('')
  useEffect(() => {
    if (localStorage.getItem('userName')) {
      setUserName(localStorage.getItem('userName')!)
    }
  }, [])

  return (
    <div className={style.wrapper}>
      <Nav userName={userName || props.userName}>{props.children}</Nav>
    </div>
  )
}
