import type { SocietyAdminSignupRequest, ResidentSignupRequest, SocietyValidationResponse } from "../types";
import { MOCK_SOCIETIES } from "../mock/mockSocieties";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const signupService = {
  // TODO: Replace with Spring Boot Signup API (POST /api/v1/auth/signup/admin)
  async registerSocietyAdmin(data: SocietyAdminSignupRequest): Promise<void> {
    await delay(1500); // Simulate network latency
    
    // Simulate error for existing email
    if (data.email === "admin@sociohub.com") {
      throw new Error("Email already exists");
    }

    console.log("Mock Registration Success (Admin):", data);
    return;
  },

  // TODO: Replace with Spring Boot Signup API (POST /api/v1/auth/signup/resident)
  async registerResident(data: ResidentSignupRequest): Promise<void> {
    await delay(1500); // Simulate network latency
    
    // Simulate error for existing email
    if (data.email === "resident@sociohub.com") {
      throw new Error("Email already exists");
    }

    if (!MOCK_SOCIETIES[data.societyCode]) {
      throw new Error("Invalid Society Code");
    }

    console.log("Mock Registration Success (Resident):", data);
    return;
  },

  // TODO: Replace with Spring Boot API (GET /api/v1/society/validate-code)
  async validateSocietyCode(code: string): Promise<SocietyValidationResponse> {
    await delay(500); // Simulate network latency
    
    const formattedCode = code.toUpperCase();
    const society = MOCK_SOCIETIES[formattedCode];

    if (society) {
      return {
        isValid: true,
        societyName: society.name,
        city: society.city
      };
    }

    return {
      isValid: false,
      error: "Invalid Society Code"
    };
  }
};
