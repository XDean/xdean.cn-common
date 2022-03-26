export type Like = {
  total: number
  you: boolean
}

export type Read = {
  total: number
  unique_total: number
}

export type ObjStat = {
  id: string
  unique_read: number
  read: number
  like: number
  liked: boolean
}