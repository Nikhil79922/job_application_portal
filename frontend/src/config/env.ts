const env = {
    API_URL:
      process.env.NEXT_PUBLIC_API_URL,
  
    NODE_ENV:
      process.env.NODE_ENV ||
      "development",
  }
  
  export default env