import style from './index.module.scss'
import { useRouter } from 'next/router'

export default function Home() {
  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ]

  const router = useRouter()

  const jumpProject = (id?: string) => {
    if (id) {
      router.push(`/project?id=${id}`)
    } else {
      router.push('/project')
    }
  }

  const jumpFile = (id?: string) => {
    if (id) {
      router.push(`/file?id=${id}`)
    } else {
      router.push('/file')
    }
  }

  return (
    <div className={style.homeWrapper}>
      <div className={`${style.homeLeft} ${style.homeBox}`}>
        <div className={style.homeLeftTitle}>
          <div>最近项目</div>
          <span onClick={() => jumpProject()}>More</span>
        </div>
        <div className={style.homeLeftList}>
          {!!data &&
            data.map((item, index) => (
              <div
                key={index}
                className={style.homeLeftListItem}
                onClick={() => jumpProject()}
              >
                {item}
              </div>
            ))}
        </div>
      </div>
      <div className={`${style.homeRight} ${style.homeBox}`}>
        <div className={style.homeLeftTitle}>
          <div>最近文件</div>
          <span onClick={() => jumpFile()}>More</span>
        </div>
        <div className={style.homeLeftList}>
          {!!data &&
            data.map((item, index) => (
              <div
                key={index}
                className={style.homeLeftListItem}
                onClick={() => jumpFile()}
              >
                {item}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
