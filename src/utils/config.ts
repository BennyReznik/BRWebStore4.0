export enum KnownConfigKey {
  JwtSecret = "jwt-sign-secret"
}

function get(key: string): string {
  return "Some_Secret";
}

export default {
  get
};
