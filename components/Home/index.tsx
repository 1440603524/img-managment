import style from './index.module.scss'
import { useRouter } from 'next/router'
import { selectProject } from '@store/projectReducer'
import { useAppSelector } from '@hooks/common'
import { useEffect, useState } from 'react'
import { fetchGetRecentProject } from '@api/project/recentProject'
import { ProjectList } from '@interface/common'

export default function Home(props: any) {
  const project = useAppSelector(selectProject)
  const [recentProjectList, setRecentProjectList] = useState<ProjectList>([])
  const router = useRouter()

  useEffect(() => {
    getRecentData()
  }, [])

  const jumpProject = (id?: number) => {
    if (id) {
      router.push(`/project?id=${id}`)
    } else {
      router.push('/project')
    }
  }

  const jumpFile = (id?: number) => {
    if (id) {
      router.push(`/file?id=${id}`)
    } else {
      router.push('/file')
    }
  }

  const getRecentData = async () => {
    const projectList = await fetchGetRecentProject()
    setRecentProjectList(projectList.data)
  }

  return (
    <div className={style.homeWrapper}>
      <div className={`${style.homeLeft} ${style.homeBox}`}>
        <div className={style.homeLeftTitle}>
          <div>最近项目</div>
          <span onClick={() => jumpProject()}>More</span>
        </div>
        <div className={style.homeLeftList}>
          {!!recentProjectList &&
            recentProjectList.map((item, index) => (
              <div key={index} className={style.homeLeftListItem}>
                <span onClick={() => jumpProject(item.id)}>
                  {item.projectName}
                </span>
                <div className={style.projectDesc}>
                  描述：{item.projectDesc}
                </div>
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
          {!!recentProjectList &&
            recentProjectList.map((item, index) => (
              <div key={index} className={style.homeLeftListItem}>
                <span onClick={() => jumpFile()}>{item.projectName}</span>
                <div className={style.projectDesc}>
                  描述：{item.projectDesc}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
