declare module "ember-simple-auth/utils/is-fastboot" {
  export default function isFastBootCPM(): boolean;
  export function isFastBoot(owner: any): boolean;
}

declare module "ember-simple-auth/test-support" {
  export function authenticateSession(sessionObject: {}): Promise<void>;
}
