import PageWrapper from '@components/PageWrapper'
import Project from '@components/Project'

export default function IndexPage(props: any) {
  return (
    <PageWrapper {...props}>
      <Project></Project>
    </PageWrapper>
  )
}
