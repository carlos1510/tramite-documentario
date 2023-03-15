export const mix =
  (...args) =>
    (value = null) =>
      args.reduce((a, b) => (b && b(value)) || a, undefined)

export const maxLength =
  (length, message = `Ingresar máximo ${length} caracteres`) =>
      (value) =>
      value ? ((value || '').length > length ? message : undefined) : undefined

export const minLength =
  (length, message = `Ingresar mínimo ${length} caracteres`) =>
      (value) =>
      value ? ((value || '').length < length ? message : undefined) : undefined

export const required =
  (message = 'Campo requerido') =>
      (value) =>
      typeof value === 'boolean' && value ? undefined : value === 0 ? undefined : value ? undefined : message

const EMAIL_REGEX = /^[\w-.]+@([a-zA-Z0-9-]+\.)+[\w]{2,4}$/

const PHONE_REGEX = /^\+?[0-9]{1,3}-?[0-9]{5,12}$/
const PERUVIAN_PHONE_REGEX = /^\+?[0-9]{9}$/

const NUMBER_REGEX = /^\d+$/
const PRICE_REGEX = /^\d{1,5}\.\d{2}$/
const LETTER = /^([a-zA-ZÀ-ÿ\u00f1\u00d1 ])+$/

export const isEmail =
  (message = 'No es un email válido') =>
      (value) =>
      value ? (EMAIL_REGEX.test(value) ? undefined : message) : undefined

export const isPhone =
  (message = 'No es un teléfono válido') =>
      (value) =>
      value ? (PHONE_REGEX.test(value) ? undefined : message) : undefined

export const isPeruvianCellphone =
  (message = 'No es un teléfono válido') =>
      (value) =>
      value ? (PERUVIAN_PHONE_REGEX.test(value) ? undefined : message) : undefined

export const isNumber =
  (message = 'Solo se permiten números') =>
      (value) =>
      value ? (NUMBER_REGEX.test(value) ? undefined : message) : undefined

export const isPrice =
  (message = 'Solo se permiten monto de precios') =>
      (value) =>
      value ? (PRICE_REGEX.test(value) ? undefined : message) : undefined

export const isDate =
  (message = 'Ingresa una fecha válida') =>
      (value) =>
      value === null ? undefined : value instanceof Date && value?.getTime() !== value?.getTime() ? message : undefined

export const editPassword =
  (message = 'Si cambias tu contraseña, ingresar mínimo 8 caracteres') =>
      (value) =>
      !value ? undefined : value.length >= 8 ? undefined : message

/*export const isRichTextFieldEmpty =
  (message = 'Campo requerido') =>
      (html: any) =>
      html ? (parseHtml2EditorState(html).getCurrentContent().hasText() ? undefined : message) : undefined*/

const URL_REGEX = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|localhost|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '((\\?|\\#)[;&a-z\\d%\\[\\]_.~+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$',
  'i'
)
export const isURL =
  (message = 'No es una URL válida') =>
      (value) =>
      value ? (URL_REGEX.test(value) ? undefined : message) : undefined

/*export const maxFileSize =
  (maxSize: number, prefix: any, message = `Has sobrepasado el límite de ${maxSize} ${prefix}`) =>
      (value: any[]) =>
      value ? (value.reduce((acc, v) => acc + parseToXB(v.size, prefix), 0) > maxSize ? message : undefined) : undefined*/

export const isLetter =
  (message = 'Solo se permite letras') =>
      (value) =>
      value ? (LETTER.test(value) ? undefined : message) : undefined