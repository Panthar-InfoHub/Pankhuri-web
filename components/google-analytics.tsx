import { GoogleAnalytics } from "@next/third-parties/google";

const GoogleAnalyticsWrpper = () => {

    if(!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) return null;

    return (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!} />
    )
}

export default GoogleAnalyticsWrpper;