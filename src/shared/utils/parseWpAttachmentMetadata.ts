import { unserialize } from 'php-serialize';

export function parseWpAttachmentMetadata(serializedData) {
  const trimmedData = serializedData.trim();

  // Check if the serialized data is in the JSON format
  if (trimmedData.startsWith('{') && trimmedData.endsWith('}')) {
    try {
      // Parse the serialized JSON data to a JavaScript object
      const metadata = JSON.parse(trimmedData);
      return metadata;
    } catch (error) {
      console.error('Error parsing wp_attachment_metadata JSON value:', error);
      return null;
    }
  }

  // Check if the serialized data is a comma-separated value
  if (trimmedData.includes(',')) {
    // Split the string by commas and return the resulting array
    return trimmedData.split(',').map((item) => item.trim());
  }

  // If the serialized data is not in JSON format, it might be in the PHP serialized format
  // Use a third-party library like "php-serialize" to parse the PHP serialized data
  // https://www.npmjs.com/package/php-serialize

  try {
    // Deserialize the PHP serialized data to a JavaScript object
    const metadata = unserialize(serializedData);
    return typeof metadata === 'string'
      ? metadata.trim()
      : metadata.map((item) => item.trim());
  } catch (error) {
    console.error(
      'Error parsing wp_attachment_metadata PHP serialized value:',
      error,
    );
    return null;
  }
}
