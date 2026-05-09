export function formatPhoneNumber(phone: string): string {
  // Split phone number into 4-digit groups for better readability.
  return phone.replace(/(\d{4})(?=\d)/g, "$1 ");
}
