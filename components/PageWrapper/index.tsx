import style from './index.module.scss'
import Nav from '@components/Nav'

export default function PageWrapper(props: any) {
  return (
    <div className={style.wrapper}>
      <Nav>{props.children}</Nav>
    </div>
  )
}
