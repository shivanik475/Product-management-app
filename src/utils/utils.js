export function handleBackNavigation(router) {
    console.log("User clicked Back button");
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push("/");
    }
  }