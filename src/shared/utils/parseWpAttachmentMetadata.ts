import {unserialize} from 'php-serialize'

export function parseWpAttachmentMetadata(serializedData) {
  // Check if the serialized data is in the JSON format
  if (serializedData.trim().startsWith('{') && serializedData.trim().endsWith('}')) {
    try {
      // Parse the serialized JSON data to a JavaScript object
      const metadata = JSON.parse(serializedData);
      return metadata;
    } catch (error) {
      console.error('Error parsing wp_attachment_metadata JSON value:', error);
      return null;
    }
  }

  // If the serialized data is not in JSON format, it might be in the PHP serialized format
  // Use a third-party library like "php-serialize" to parse the PHP serialized data
  // https://www.npmjs.com/package/php-serialize
  

  try {
    // Deserialize the PHP serialized data to a JavaScript object
    const metadata = unserialize(serializedData);
    return metadata;
  } catch (error) {
    console.error('Error parsing wp_attachment_metadata PHP serialized value:', error);
    return null;
  }
}