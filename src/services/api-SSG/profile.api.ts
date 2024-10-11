import { IProfileResponse } from '@/services'
import { AxiosInstance } from 'axios'

export class ProfileAPI {
  constructor(private instance: AxiosInstance) {}

  public getProfile() {
    return this.instance
      .get<IProfileResponse>('v1/users/profile')
      .then(res => res.data)
      .catch(e => e.data)
  }
}
