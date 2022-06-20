export interface AuthCodeSingleDevice {
  type: 'single';
  ref: string;
  keyPair: string;
  browserId: string;
  fullCode: string;
}

export interface AuthCodeMultiDevice {
  type: 'multidevice';
  ref: string;
  staticKeyPair: string;
  identityKeyPair: string;
  secretKey: string;
  fullCode: string;
}

export type AuthCode = AuthCodeSingleDevice | AuthCodeMultiDevice;
