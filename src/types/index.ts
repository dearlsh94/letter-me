export interface INickName {
  nickName: string,
  reason: string,
  fromId: string
}

export interface IPersonData {
  name: string,
  salt: string,
  sendLink?: string,
  encrypted?: string,
  myLink?: string
  nickNames?: INickName[]
}

export interface IInfoCount {
  userCount: number,
  nickNameCount: number
}