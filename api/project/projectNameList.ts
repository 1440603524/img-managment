import fetcher from '@lib/fetcher'

export const fetchGetProjectNameList = (myList: boolean = false) => {
  const token = window.localStorage.getItem('img-token')
  return fetcher('/project/list/name', { myList }, process.env.API_HOST, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
