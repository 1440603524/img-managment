import fetcher from '@lib/fetcher'

export const fetchDeleteMember = (config: {
  memberId?: number
  projectId?: number
}) => {
  const token = window.localStorage.getItem('img-token')
  return fetcher('/member/delete', config, process.env.API_HOST, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
