class ApiError {
    constructor(
        statusCode,
        message = "Something want wrong !",
        errors = [],
    ) {
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
    }
}

export { ApiError }