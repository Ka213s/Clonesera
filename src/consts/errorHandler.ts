// errorHandler.ts
export const handleHttpErrors = (status: number) => {
    switch (status) {
      case 400:
        // Handle 400 error
        break;
      case 403:
        window.location.href = '/403';
        break;
      case 404:
      
        break;
      case 500:
        window.location.href = '/500';
        break;
      default:
        // Handle other errors
        break;
    }
  };
  