import PageWrapper from '@components/PageWrapper'
import Editor from '@components/Editor'

export default function IndexPage(props: any) {
  return (
    <PageWrapper {...props}>
      <Editor></Editor>
    </PageWrapper>
  )
}
