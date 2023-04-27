import PageWrapper from '@components/PageWrapper'
import Home from '@components/Home'
import { useEffect, useState } from 'react'
import { fetchUserInfo } from '@api/user/userInfo'

export default function IndexPage(props: any) {
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    initState()
  }, [])

  const initState = async () => {
    const res = await fetchUserInfo()
    if (res.code === 200) {
      setUserName(res.data.userName)
      localStorage.setItem(userName, res.data.userName)
    }
    console.log(res)
  }
  return (
    <PageWrapper {...props} userName={userName}>
      <Home></Home>
    </PageWrapper>
  )
}
