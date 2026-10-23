type AuthError = {
  status: number;
  message?: string;
};

const REAUTH_PATTERN = /expired|fresh|re-?authenticate/i;

export const isReauthRequired = ({ status, message }: AuthError) =>
  status === 403 || REAUTH_PATTERN.test(message ?? "");