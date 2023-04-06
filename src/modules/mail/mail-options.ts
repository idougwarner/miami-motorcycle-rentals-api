export interface MailOptions {
  to: string;
  i18nSubjectKey?: string;
  subject?: string;
  template: string;
  year?: string;
  attachments?: any[];
  context: { [key: string]: any };
}
