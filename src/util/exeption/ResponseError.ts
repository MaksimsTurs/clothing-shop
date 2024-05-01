class ResponseError extends Error {
  message: string = "{ code: 500, message: 'Some goes wrong!' }"

  constructor(JSONString: unknown) {
    super(JSONString as string)
    this.message = JSONString as string
  }
}

export default ResponseError