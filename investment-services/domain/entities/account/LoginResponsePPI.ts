export class LoginResponsePPI{
  constructor(
      public creationDate: string,
      public expirationDate: string,
      public accessToken: string,
      public expires: number,
      public refreshToken: string,
      public tokenType: string
  ){}
}
