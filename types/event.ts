export interface EventInfo {
  name: string;
  year: string;
  organization: string;
  websiteUrl: string;
}

export interface AdminProfile {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
}

export interface AppSettings {
  registrationOpen: boolean;
  openingDate: string;
  closingDate: string;
  registrationLimit: number;
  maxTeamSize: number;
  confirmationMessage: string;
  successPageContent: string;
  autosave: boolean;
  requiredFields: string[];
}
