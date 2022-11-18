import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ProjectList, ProjectState } from '@interface/common'

import type { AppState } from '@store/index'

const initialState: ProjectState = {
  value: [],
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    initProject: (state, action: PayloadAction<ProjectList>) => {
      state.value = action.payload
    },
  },
})

export const { initProject } = projectSlice.actions

export const selectProject = (state: AppState) => state.project.value

export default projectSlice.reducer
