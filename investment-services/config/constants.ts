export const PPI_BASE_URL = {
  SANDBOX: 'https://clientapi_sandbox.portfoliopersonal.com/',
  PRODUCTION: 'https://clientapi.portfoliopersonal.com/',
};

export const PPI_BASE_ACCOUNT_URL = {
  ACCOUNT: `api/${process.env.PPI_API_VERSION}/Account/`,
};

export const RESPONSE_MESSAGES = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  SAP_REQUEST_FAILED: 'PPI request failed',
};

export const HTTP_STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};
