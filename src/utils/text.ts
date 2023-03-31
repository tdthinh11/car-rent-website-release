export function subString(text: string, textLength: number) {
  if (text) {
    return text.length > textLength ? text.substring(0, textLength) + '...' : text;
  }
  return '';
}

export function formatPhoneNumber(phoneNumber: string) {
  if (phoneNumber) {
    // Strip all characters from the input except digits
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // Trim the remaining input to ten characters, to preserve phone number format
    phoneNumber = phoneNumber.substring(0, 10);

    // Based upon the length of the string, we add formatting as necessary
    const size = phoneNumber.length;
    let result;
    if (size == 0) {
      result = phoneNumber;
    } else if (size < 4) {
      result = '(' + phoneNumber;
    } else if (size < 7) {
      result = '(' + phoneNumber.substring(0, 3) + ') ' + phoneNumber.substring(3, 6);
    } else {
      result =
        '(' +
        phoneNumber.substring(0, 3) +
        ') ' +
        phoneNumber.substring(3, 6) +
        '-' +
        phoneNumber.substring(6, 10);
    }
    return result;
  }
  return '';
}

export function formatCardNumber(card: string) {
  if (card) {
    card = card
      .replace(/\D/g, '')
      .slice(0, 9)
      .replace(/^(\d{5})(\d{4})$/, '$1-$2');
    return card;
  }
  return '';
}
