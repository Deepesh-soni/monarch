export const isWebView = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Check for specific WebView markers in the user agent string
    return (
      /wv/.test(userAgent) || /Android/.test(userAgent) || /iPhone/.test(userAgent)
    );
  };
  

  