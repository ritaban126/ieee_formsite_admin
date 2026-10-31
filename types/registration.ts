export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'incomplete';

export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
  rollNumber: string;
  submittedAt: string;
  status: ApplicationStatus;
  whyJoin: string;
  experience: string;
  canAttendBoth: 'Yes' | 'No';
}
