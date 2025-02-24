interface Response {
    status: string
    codeStatus: number
    data?: any
    errorMessage?: string
}

export const buildResponse = (params: Response) => {
    return {
        statusCode: params.codeStatus,
        body: JSON.stringify({
            status: params.status,
            codeStatus: params.codeStatus,
            data: params.data || null,
            errorMessage: params.errorMessage || null,
        }),
    }
}
