import style from './index.module.scss'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchGetRecentProject } from '@api/project/recentProject'
import { fetchGetRecentFile } from '@api/file/recentFile'
import { ProjectList, FileList } from '@interface/common'

export default function Home(props: any) {
  const [recentProjectList, setRecentProjectList] = useState<ProjectList>([])
  const [recentFileList, setRecentFileList] = useState<FileList>([])
  const router = useRouter()

  useEffect(() => {
    getRecentData()
  }, [])

  const jumpProject = (projectName?: string) => {
    if (projectName) {
      router.push(`/project?projectName=${projectName}`)
    } else {
      router.push('/project')
    }
  }

  const jumpFile = (fileName?: string) => {
    if (fileName) {
      router.push(`/file?fileName=${fileName}`)
    } else {
      router.push('/file')
    }
  }

  const getRecentData = async () => {
    const projectList = await fetchGetRecentProject()
    const fileList = await fetchGetRecentFile()
    setRecentFileList(fileList.data)
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
                <span onClick={() => jumpProject(item.projectName)}>
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
          {!!recentFileList &&
            recentFileList.map((item, index) => (
              <div key={index} className={style.homeLeftListItem}>
                <span onClick={() => jumpFile(item.fileName)}>
                  {item.fileName}
                </span>
                <div className={style.projectDesc}>
                  文件类型：{item.fileType}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
