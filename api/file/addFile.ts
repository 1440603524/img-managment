import fetcher from '@lib/fetcher'

export const fetchAddFile = (config: {
  projectName: string
  fileList: any
}) => {
  const token = window.localStorage.getItem('img-token')
  return fetcher('/file/add', config, process.env.API_HOST, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
