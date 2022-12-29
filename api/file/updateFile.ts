import fetcher from '@lib/fetcher'

export const fetchUpdateFile = (config: {
  projectName: string
  file: any
  id: number
}) => {
  const token = window.localStorage.getItem('img-token')
  return fetcher('/file/update', config, process.env.API_HOST, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
