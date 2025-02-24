export const STATE_CREDIT_BEHAVIOR = {
    WITHOUT_CREDIT_LESS: 1,
    WITHOUT_CREDIT_MORE: 2,
    WITH_CREDIT_LESS: 3,
    WITH_CREDIT_MORE: 4,
}

export const STATE_CREDIT_BEHAVIOR_TEXT = {
    WITHOUT_CREDIT_LESS: 'Sin crédito y menor a tres meses',
    WITHOUT_CREDIT_MORE: 'Sin crédito y mayor a tres meses',
    WITH_CREDIT_LESS: 'Con crédito y menor a tres meses',
    WITH_CREDIT_MORE: 'Con crédito y mayor a tres meses',
}

export const RESPONSE_MESSAGES = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    SAP_REQUEST_FAILED: 'SAP request failed',
}

export const HTTP_STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
}