import fetcher from '@lib/fetcher'

export const fetchAddProject = (params: unknown) => {
  const token = window.localStorage.getItem('img-token')
  return fetcher('/project/add', params, process.env.API_HOST, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
