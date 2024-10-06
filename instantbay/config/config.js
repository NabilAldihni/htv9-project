import { REACT_APP_EBAY_API_URL, REACT_APP_EBAY_API_TOKEN } from '@env';

export const EBAY_API_URL = REACT_APP_EBAY_API_URL || 'https://api.sandbox.ebay.com';
export const EBAY_API_TOKEN = REACT_APP_EBAY_API_TOKEN || 'your-default-token-here';

export const getHeaders = () => ({
  'Authorization': `Bearer ${EBAY_API_TOKEN}`,
  'Content-Type': 'application/json',
});