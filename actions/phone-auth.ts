export async function RequestOtp(phone: string) {
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/otp/request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error requesting OTP:", error);
        return { success: false, message: "Failed to request OTP from backend" };
    }
}

export async function VerifyOtp(phone: string, otp: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/otp/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone, otp }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return { success: false, message: "Failed to verify OTP" };
    }
}
