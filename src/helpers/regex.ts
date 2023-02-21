/* eslint-disable no-useless-escape */
export const senhaRegex = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/\?])([\w!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/\?]{4,10})/;
export const hasLetterRegex = /(?=.*[a-zA-Z])[a-zA-Z]{1,}/;
export const hasNumberRegex = /(?=.*[0-9])[0-9]{1,}/;
export const hasSpecialCharRegex = /(?=.*[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/\?])[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/\?]{1,}/;
export const usernameRegex = /[^a-z._]/gi;