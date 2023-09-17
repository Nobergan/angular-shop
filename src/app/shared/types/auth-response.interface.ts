export interface AuthResponseInterface {
  displayName: string;
  idToken: string;
  kind: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
