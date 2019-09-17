/**
 * Patch the third party library which does not have @types package.
 */
declare module 'react-cookies' {
  const mainExport: any;
  export default mainExport;
}
