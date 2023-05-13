export class AppConstants {
  public static readonly DATE_FORMAT = 'YYYY-MM-DD';
  public static readonly TIME_FORMAT = 'HH:mm a';
  public static readonly DATE_TO_STRING_FORMAT = 'MMM DD, YYYY';
  public static readonly MIN_PASSWORD_LENGTH = 3;
  public static readonly MAX_PASSWORD_LENGTH = 65;
  public static readonly JWT_SECRET = 'secretKey';
  public static readonly JWT_SIGN_OPTIONS = { expiresIn: '1hr' };
  public static readonly TEST = 'TEST'; // sample usage of shared resource
  public static readonly WP_DB_CONNECTION = 'wp_db_connection';
}
