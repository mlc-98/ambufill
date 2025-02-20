// alphanumericSpace: Alphanumeric characters and spaces (regular whitespace)
export const alphanumericSpace = /^[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ0-9 ]+$/u;
// alphanumericPunctuation: Alphanumeric characters and punctuation
export const alphanumericPunctuation =
    /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\d¡!¿?.,;:'" ()\-]+$/u;
// alphanumeric: Alphanumeric characters
export const alphanumeric = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\d]+$/u;
// alphabetical: Alphabetic characters (spanish alphabet)
export const alphabetical = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+$/u;
// alphabeticSpace: Alphabetic characters and spaces (regular whitespace)
export const alphabeticSpace = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/u;
// numeric: Numeric characters
export const numeric = /^\d+$/u;
export const plate = /^[A-Z]{3}\d{3}$/u;
