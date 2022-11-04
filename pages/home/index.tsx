import style from './index.module.scss'
import { useRouter } from 'next/router'

export default function IndexPage() {
  const router = useRouter()
  const handler = () => {
    router.push('/login')
  }
  return (
    <div onClick={handler} className={style.homeWrapper}>
      Home
    </div>
  )
}
