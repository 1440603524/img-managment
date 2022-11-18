export interface IProjectListItem extends IProjectNameListItem {
  projectDesc: string
  updateAt: string
  projectCreator: string
  projectEditor: string
  isOwner: boolean
}

export interface IFileListItem {
  id: number
  fileName: string
  fileType: string
  updateAt: string
  createAt: string
  creatorName: string
  editorName: string
  projectName: string
}

export interface IMemberListItem {
  userName: string
  status: number
  id: number
}

export interface ProjectState {
  value: ProjectList
}

export interface IProjectNameListItem {
  id: number
  projectName: string
}

export type MemberList = IMemberListItem[]

export type ProjectList = IProjectListItem[]

export type FileList = IFileListItem[]

export type ProjectNameList = IProjectNameListItem[]
