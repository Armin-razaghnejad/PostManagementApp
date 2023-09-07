export interface Post {
  userId: number,
  id?: number,
  title: string,
  body: string
}

export interface StatePost {
  data: ReadonlyArray<Post>,
  loading: boolean,
  message?: string
}

export interface StateNewPost {
  loading: boolean,
  data?: Post,
  message?: string
}