import PageWrapper from '@components/PageWrapper'
import Home from '@components/Home'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { fetchUserInfo } from '@api/user/userInfo'

export default function IndexPage(props: any) {
  const router = useRouter()

  useEffect(() => {
    initState()
  }, [])

  const initState = async () => {
    const res = await fetchUserInfo()
  }
  return (
    <PageWrapper {...props}>
      <Home></Home>
    </PageWrapper>
  )
}
