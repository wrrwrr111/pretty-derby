interface UserAgentInfo {
  ios: boolean;
  android: boolean;
  isPhone: boolean;
}

const useUa = (): UserAgentInfo => {
  const userAgent = navigator.userAgent;
  const maxTouchPoints = navigator.maxTouchPoints;

  const ua: UserAgentInfo = {
    ios: /iPhone/.test(userAgent) || maxTouchPoints > 2,
    android: /Android \d/.test(userAgent),
    isPhone: false, // Will be set below
  };

  ua.isPhone = ua.ios || ua.android;

  return ua;
};

export default useUa;
