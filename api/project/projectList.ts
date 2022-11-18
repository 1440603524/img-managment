import fetcher from '@lib/fetcher'

export const fetchGetProjectList = (
  config: {
    editorName?: string
    ownerName?: string
    projectName?: string
    pageSize?: number
    page?: number
  } = {
    pageSize: 10,
    page: 1,
  }
) => {
  const token = window.localStorage.getItem('img-token')
  return fetcher('/project/list', config, process.env.API_HOST, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
