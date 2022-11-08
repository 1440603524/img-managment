import style from './index.module.scss'
import PageWrapper from '@components/PageWrapper'
import Home from '@components/Home'

export default function IndexPage(props: any) {
  return (
    <PageWrapper {...props}>
      <Home></Home>
    </PageWrapper>
  )
}
