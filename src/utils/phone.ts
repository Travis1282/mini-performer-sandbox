export const stripPhoneNumberFormatting = (phoneNumber: string) => {
  return phoneNumber.replace(/[() -]/g, '');
};
