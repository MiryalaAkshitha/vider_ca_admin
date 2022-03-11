function AuthWrapper({ children }) {
  if (
    !localStorage.getItem("token") &&
    window.location.pathname !== "/login" &&
    window.location.pathname !== "/signup" &&
    window.location.pathname !== "/join"
  ) {
    window.location.href = "/login";
  }

  return <>{children}</>;
}

export default AuthWrapper;
