const mapping: Record<string, string> = {
  renamedcases: 'Renamedcase',
  compliances: 'compliance',
  frauds: 'fraud',
  organizations: 'organization',
  policies: 'policy',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
