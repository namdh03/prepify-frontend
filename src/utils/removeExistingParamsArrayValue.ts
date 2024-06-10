import extractExistingParams from "./extractExistingParams";

/**
 * Remove a value from an existing parameter where the parameter can occur multiple times
 * If the value is the last value, the parameter is removed
 *
 * @param {URLSearchParams} searchParams
 * @param {string} key
 * @param {string} value
 */
export default function removeExistingParamsArrayValue(searchParams: URLSearchParams, key: string, value: string) {
  const existingParams = extractExistingParams(searchParams);
  if (existingParams[key]) {
    existingParams[key] = existingParams[key].filter((v) => v !== value);
  }
  if (existingParams[key].length === 0) {
    delete existingParams[key];
  }
  return existingParams;
}
