export function getMediaType(mimeType) {
  const [type] = mimeType.split('/');

  switch (type) {
    case 'image':
      return 'image';
    case 'video':
      return 'video';
    case 'audio':
      return 'audio';
    default:
      return 'unknown';
  }
}
