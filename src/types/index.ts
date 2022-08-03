export interface INickName {
  nickName: string,
  reason: string,
  fromId: number
}

export interface IPersonData {
  name: string,
  salt: string,
  sendLink?: string,
  encrypted?: string,
  myLink?: string
  nickNames?: INickName[]
}