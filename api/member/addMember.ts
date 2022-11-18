import fetcher from '@lib/fetcher'

export const fetchAddMember = (config: {
  memberName?: string
  memberId?: number
  projectId?: number
}) => {
  const token = window.localStorage.getItem('img-token')
  return fetcher('/member/add', config, process.env.API_HOST, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
