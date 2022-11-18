import fetcher from '@lib/fetcher'

export const fetchEditProject = (params: unknown) => {
  const token = window.localStorage.getItem('img-token')
  return fetcher('/project/edit', params, process.env.API_HOST, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
