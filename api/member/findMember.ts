import fetcher from '@lib/fetcher'

export const fetchSearchMember = (config: {
  memberName?: string
  projectId?: number
}) => {
  const token = window.localStorage.getItem('img-token')
  return fetcher('/member/search', config, process.env.API_HOST, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
