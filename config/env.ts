// Environment Configuration
// Add these environment variables to your Vercel project or .env.local file

export const config = {
  // API Configuration
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api",

  // App Configuration
  APP_NAME: "Pankhuri",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
}

// Validation function to check if required env vars are set
export const validateEnv = () => {
  const missingVars: string[] = []

  if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    missingVars.push("NEXT_PUBLIC_API_BASE_URL")
  }

  if (missingVars.length > 0 && process.env.NODE_ENV === "production") {
    console.warn(`Missing environment variables: ${missingVars.join(", ")}`)
  }
}
