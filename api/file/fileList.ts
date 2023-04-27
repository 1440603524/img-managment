import fetcher from '@lib/fetcher'

export const fetchGetFileList = (
  config: {
    editorName?: string
    creatorName?: string
    projectName?: string
    fileName?: string | string[]
    pageSize?: number
    page?: number
  } = {
    pageSize: 10,
    page: 1,
  }
) => {
  const token = window.localStorage.getItem('img-token')
  return fetcher('/file/list', config, process.env.API_HOST, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
