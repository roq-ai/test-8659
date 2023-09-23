interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Administrator'],
  customerRoles: ['Customer'],
  tenantRoles: ['Administrator', 'Case Manager', 'Fraud Investigator', 'Compliance Officer', 'End User'],
  tenantName: 'Organization',
  applicationName: 'TEST',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Read case information',
    'Read fraud information',
    'Read own user information',
    'Read policy information',
  ],
  ownerAbilities: ['Manage user data', 'Manage organization data', 'Manage policy data', 'Manage case data'],
  getQuoteUrl: 'https://app.roq.ai/proposal/9d89679f-d82b-4ec1-98aa-f60ac04f9e61',
};
