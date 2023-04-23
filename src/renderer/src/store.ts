import { configureStore } from '@reduxjs/toolkit'
import companies from './services/redux/allCompanies'

export const store = configureStore({
  reducer: {
    companies
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
