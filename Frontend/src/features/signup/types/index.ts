export interface SocietyAdminSignupRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  societyName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  agreedToTerms: boolean;
}

export interface ResidentSignupRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  societyCode: string;
  flatNumber: string;
  residentType: 'OWNER' | 'TENANT';
  agreedToTerms: boolean;
}

export interface SocietyValidationResponse {
  isValid: boolean;
  societyName?: string;
  city?: string;
  error?: string;
}
