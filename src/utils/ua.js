const useUa = () => {
  const ua = {};
  ua.ios = /iPhone/.test(navigator.userAgent) || navigator.maxTouchPoints > 2;
  ua.android = /Android \d/.test(navigator.userAgent);
  ua.isPhone = ua.ios || ua.android;
  return ua;
};

export default useUa;
