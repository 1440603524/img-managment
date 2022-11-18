import fetcher from '@lib/fetcher'

export const fetchGetMemberList = (
  config: {
    projectId?: number
    pageSize?: number
    page?: number
  } = {
    pageSize: 10,
    page: 1,
  }
) => {
  const token = window.localStorage.getItem('img-token')
  return fetcher('/member/list', config, process.env.API_HOST, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
