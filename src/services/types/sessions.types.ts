export interface ISessionList {
  current: ISession
  others?: ISession[]
}

export interface ISession {
  browserName: string
  browserVersion: string
  deviceId: number
  deviceName: string
  deviceType: string
  ip: string
  lastActive: string // TODO Not sure of type
  osName: string
  osVersion: string
}
