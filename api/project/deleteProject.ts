import fetcher from '@lib/fetcher'

export const fetchDeleteProject = (params: unknown) => {
  const token = window.localStorage.getItem('img-token')
  return fetcher('/project/delete', params, process.env.API_HOST, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
