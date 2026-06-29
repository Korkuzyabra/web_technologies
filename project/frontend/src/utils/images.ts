export const IMAGE_COUNT = 21;

export function slotImagePath(slot: number): string {
  const safe = ((slot % IMAGE_COUNT) + IMAGE_COUNT) % IMAGE_COUNT;
  const num = safe + 1;
  const ext = num === 2 ? 'png' : 'jpg';
  return `/images/image_${num}.${ext}`;
}

export function listingImageSlot(uniqueId: string): number {
  let hash = 0;
  for (let i = 0; i < uniqueId.length; i += 1) {
    hash = (hash * 31 + uniqueId.charCodeAt(i)) | 0;
  }
  return ((hash % IMAGE_COUNT) + IMAGE_COUNT) % IMAGE_COUNT;
}
