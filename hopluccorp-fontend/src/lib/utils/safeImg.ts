/**
 * Safe image URL helper.
 * Returns the URL if valid, or a placeholder fallback.
 * Prevents passing empty string "" to Next.js <Image> src.
 */
export function safeImg(url: string | null | undefined, fallback = '/images/placeholder.svg'): string {
  return url && url.trim() !== '' ? url : fallback;
}
