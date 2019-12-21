/* For SPA.
declare module '*.svg'
declare module '*.jpg'
declare module '*.png'
declare module '*.gif'
*/
declare module '*.json' {
  const value: any
  export default value
}
