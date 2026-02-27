"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ShieldCheck,
    Eye,
    Info,
    Fingerprint,
    Mail,
    Lock,
    Cookie,
    FileText,
    Globe,
    Users,
    BookOpen,
    Scale,
    Server,
    Link as LinkIcon,
    RefreshCw,
    Copyright,
    Phone
} from "lucide-react";

export default function PrivacyPolicy() {
    const sections = [
        { id: "introduction", title: "1. Introduction", icon: <Info className="w-5 h-5" /> },
        { id: "definitions", title: "2. Definitions", icon: <BookOpen className="w-5 h-5" /> },
        { id: "collection", title: "3. Collection & Use", icon: <Eye className="w-5 h-5" /> },
        { id: "disclosure", title: "4. Disclosure", icon: <Users className="w-5 h-5" /> },
        { id: "security", title: "5. Security", icon: <ShieldCheck className="w-5 h-5" /> },
        { id: "links", title: "6. Links", icon: <LinkIcon className="w-5 h-5" /> },
        { id: "changes", title: "7. Changes", icon: <RefreshCw className="w-5 h-5" /> },
        { id: "ip", title: "8. Intellectual Property", icon: <Copyright className="w-5 h-5" /> },
        { id: "contact", title: "9. Contact Us", icon: <Mail className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-primary/5 via-primary/2 to-transparent -z-10" />
            <div className="absolute top-40 right-[-10%] w-[40%] h-[40%] bg-primary/3 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-40 left-[-10%] w-[40%] h-[40%] bg-accent/3 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-16 space-y-6">
                    <Badge variant="secondary" className="px-4 py-1.5 rounded-full bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all font-medium text-sm tracking-wide">
                        Last Updated: January 2, 2022
                    </Badge>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground balance">
                        Privacy <span className="text-primary relative inline-block">
                            Policy
                            <svg className="absolute -bottom-2 left-0 w-full h-2 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 25 0 50 5 Q 75 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </span>
                    </h1>
                    <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
                        This Privacy Policy ensures our firm commitment to your privacy vis-à-vis the protection of your information.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Quick Nav Sidebar */}
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24 space-y-8">
                            <div className="space-y-1">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 px-4">Navigation</h3>
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/5 hover:text-primary transition-all group border border-transparent hover:border-primary/10"
                                    >
                                        <div className="text-muted-foreground group-hover:text-primary transition-colors">
                                            {section.icon}
                                        </div>
                                        <span className="font-medium text-sm">{section.title}</span>
                                    </a>
                                ))}
                            </div>

                            <Card className="bg-primary/5 border-primary/10 overflow-hidden shadow-none">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center gap-2 text-primary">
                                        <ShieldCheck className="w-5 h-5" />
                                        <span className="font-bold text-sm">Data Security</span>
                                    </div>
                                    <p className="text-xs text-primary/80 leading-relaxed">
                                        Concerned about your data? Reach out to our privacy officer.
                                    </p>
                                    <a href="mailto:tech@pankhuri.co" className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                                        Privacy Support
                                    </a>
                                </CardContent>
                            </Card>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-24 pb-20">
                        {/* 1. Introduction */}
                        <section id="introduction" className="scroll-mt-24 space-y-8">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase tracking-tighter">1. Introduction</h2>
                            </div>
                            <div className="prose prose-p:text-muted-foreground max-w-none space-y-4 text-justify">
                                <p>
                                    Welcome to pankhuri.co (“Website”) and Pankhuri App (“Application”), a platform that brings together customer engagement, content delivery and administration tools in one place and is focused on helping experts go online to support a live interactive approach and online knowledge commerce solutions through video conferencing and related services (Website and Mobile App are hereinafter collectively referred to as “Platform”) owned and managed by RP Cube Private Limited (“Company”).
                                </p>
                                <p>
                                    Your visit and use of platform for Customer engagement, content delivery, administration tools, digital learning solutions through video conferencing, collaboration, and related services, support, professional services offered on the Platform (“Services”) are subject to this privacy, security and cookies policy ("Privacy Policy") and other terms and conditions of the Platform. This Privacy Policy ensures our firm commitment to your privacy vis-à-vis the protection of your information.
                                </p>
                                <p>
                                    In this Privacy Policy "we", "our" and "us" refers to Pankhuri and "you", "your" and/or “Users” refers to the user of the Platform. Our Platform is for Experts and Customers.
                                </p>
                                <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
                                    <p className="font-medium text-foreground mb-2">Age Requirement</p>
                                    <p className="text-sm">
                                        You must be 13 years of age or older to visit or use the Website and/or Application in any manner. If you are under the age of 13, you should review this Privacy Policy with your parent or legal guardian to make sure that you and your parent or legal guardian understands and agrees to it and further, if required, you shall perform or undertake such activities which will entitle you to enter into a legally binding agreement with the Company.
                                    </p>
                                </div>
                                <p>
                                    This document is published and shall be construed in accordance with the provisions of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data of Information) Rules, 2011 (“Data Protection Rules”) under the Information Technology Act, 2000; that require publishing of the Privacy Policy for collection, use, storage and transfer of information.
                                </p>
                                <p>
                                    Our Terms and Conditions (“Terms”) govern all use of our Service and together with the Privacy Policy constitutes your agreement with us (“Agreement”).
                                </p>
                            </div>
                        </section>

                        {/* 2. Definitions */}
                        <section id="definitions" className="scroll-mt-24 space-y-8">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase tracking-tighter">2. Definitions</h2>
                            </div>
                            <div className="grid gap-6">
                                {[
                                    { term: "USAGE DATA", def: "Information and data collected and captured as a result of the use of Service." },
                                    { term: "COOKIES", def: "Small data files stored on your device (computer or mobile device)." },
                                    { term: "DATA CONTROLLER", def: "A natural or legal person who determines the purposes for which and the manner in which any Personal Data are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller of your data." },
                                    { term: "DATA PROCESSORS / SERVICE PROVIDERS", def: "Any natural or legal person who processes the data on behalf of the Data Controller. We may use the services of various Service Providers in order to process your data more effectively." }
                                ].map((item, i) => (
                                    <Card key={i} className="bg-card/50 border-border/50">
                                        <CardContent className="p-6">
                                            <span className="block text-sm font-bold text-primary mb-2 tracking-wide uppercase">{item.term}</span>
                                            <p className="text-muted-foreground">{item.def}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* 3. Information Collection and Use */}
                        <section id="collection" className="scroll-mt-24 space-y-10">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase tracking-tighter">3. Information Collection and Use</h2>
                            </div>

                            {/* 3.1 Collection of Data */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> 3.1 Collection of Data</h3>
                                <div className="prose prose-p:text-muted-foreground max-w-none text-justify space-y-4">
                                    <p>
                                        In order to avail the Services under the Platform, registration by the User is mandatory. A valid mobile number would be required to register on the Platform, to complete the registration process, a one time password (OTP) would be sent to you on the mobile number provided by you at the time of registration for the purpose of user validation.
                                    </p>
                                    <p>
                                        The Company respects the privacy of the Users of the Services and is committed to reasonably protect it in all respects. The information about the user as collected by the Company includes information supplied by Users, information automatically tracked while navigation, inferred information through usage and log data, and information collected from other sources.
                                    </p>
                                </div>
                            </div>

                            {/* 3.2 Types of Data Collected */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> 3.2 Types of Data Collected</h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-primary">Personal Data</h4>
                                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                            <li>Email address</li>
                                            <li>First name and last name</li>
                                            <li>Phone number</li>
                                            <li>Address, Country, State, ZIP/Postal code, City</li>
                                            <li>Gender and other demographics</li>
                                            <li>Date of birth and age</li>
                                            <li>Location Data</li>
                                            <li>Cookies and Usage Data</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-primary">Usage & Location Data</h4>
                                        <p className="text-sm text-muted-foreground">
                                            We may collect information that your browser sends whenever you visit our Platform ("Usage Data") such as IP address, browser type, pages visited, and device details. We may also use and store information about your location if you give us permission ("Location Data").
                                        </p>
                                    </div>
                                </div>

                                <Card className="bg-muted/20 border-border/50">
                                    <CardContent className="p-6 space-y-4">
                                        <h4 className="font-bold flex items-center gap-2"><Cookie className="w-4 h-4" /> Tracking Cookies Data</h4>
                                        <p className="text-sm text-muted-foreground">
                                            We use cookies and similar tracking technologies to track the activity on our Platform. Examples include Session Cookies, Preference Cookies, Security Cookies, and Advertising Cookies.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* 3.3 Purpose */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> 3.3 Purpose for Collection and Use</h3>
                                <p className="text-muted-foreground">The Company uses the collected data for various purposes including:</p>
                                <ul className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                                    {[
                                        "To create and maintain an online account",
                                        "To maintain our Platform and enable Services",
                                        "To notify you about changes to our Service",
                                        "To allow participation in interactive features",
                                        "To provide customer support",
                                        "To analyse information to improve Platform",
                                        "To monitor usage of our Platform and Services",
                                        "To detect, prevent and address technical issues",
                                        "To verify your identity and prevent fraud",
                                        "To provide you with notices about your account"
                                    ].map((purpose, i) => (
                                        <li key={i} className="flex gap-2">
                                            <span className="text-primary">•</span> {purpose}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* 3.4 Retention & 3.5 Withdrawal */}
                            <div className="grid md:grid-cols-2 gap-8 pt-4">
                                <div className="space-y-3">
                                    <h3 className="text-xl font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> 3.4 Retention of Data</h3>
                                    <p className="text-sm text-muted-foreground text-justify">
                                        We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will also retain Usage Data for internal analysis purposes.
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-xl font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> 3.5 Withdrawal of Consent</h3>
                                    <p className="text-sm text-muted-foreground text-justify">
                                        You may withdraw your consent at any time by sending an email to <span className="text-primary hover:underline cursor-pointer">tech@pankhuri.co</span>. In such event, the Company reserves the right to stop providing Services.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 4. Disclosure of Data */}
                        <section id="disclosure" className="scroll-mt-24 space-y-8">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase tracking-tighter">4. Disclosure of Data</h2>
                            </div>
                            <div className="space-y-6">
                                <Card className="border-none bg-card/50 shadow-sm">
                                    <CardContent className="p-6 space-y-4">
                                        <div className="space-y-2">
                                            <h3 className="font-bold">4.1 Legal Requirements</h3>
                                            <p className="text-sm text-muted-foreground">
                                                We may disclose your Personal Data in good faith belief that such action is necessary to comply with a legal obligation, protect and defend the rights or property of the Company, prevent or investigate possible wrongdoing, or protect the personal safety of users.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-bold">4.2 Business Transaction</h3>
                                            <p className="text-sm text-muted-foreground">
                                                If we or our subsidiaries are involved in a merger, acquisition or asset sale, your Personal Data may be transferred.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-bold">4.3 Disclosure by User</h3>
                                            <p className="text-sm text-muted-foreground">
                                                When you share Personal Information on public discussion forums, it becomes accessible to others.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        {/* 5. Data Security Practice */}
                        <section id="security" className="scroll-mt-24 space-y-10">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase tracking-tighter">5. Data Security</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold flex items-center gap-2"><Lock className="w-5 h-5 text-primary" /> 5.1 Security of Data</h3>
                                    <p className="text-muted-foreground text-sm text-justify">
                                        The security of your data is important to us but remember that no method of transmission over the Internet is 100% secure. We maintain strong security safeguards to ensure the security and confidentiality of the User’s data.
                                    </p>
                                    <div className="bg-muted p-4 rounded-xl text-sm">
                                        <p className="font-bold mb-2">Grievance Officer:</p>
                                        <address className="not-italic text-muted-foreground space-y-1">
                                            <strong>RP Cube Private Limited</strong><br />
                                            Room #1, 161, Chandra Shekhar Azad,<br />
                                            Jhansi, Uttar Pradesh, India - 284002.<br />
                                            Number: 6366132227<br />
                                            Email: tech@pankhuri.co
                                        </address>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold flex items-center gap-2"><Globe className="w-5 h-5 text-primary" /> 5.2 Transfer of Data</h3>
                                    <p className="text-muted-foreground text-sm text-justify">
                                        The information, including Personal Data, we obtain from or about you may be maintained, processed and stored by us on the systems situated in the territory of Republic of India. If you are located outside India, please note that we transfer the data to India and process it there.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 6. Links to Other Sites */}
                        <section id="links" className="scroll-mt-24 space-y-6">
                            <div className="flex items-center gap-3">
                                <LinkIcon className="text-primary w-6 h-6" />
                                <h2 className="text-2xl font-bold">6. Links to Other Sites</h2>
                            </div>
                            <p className="text-muted-foreground">
                                Our Platform may contain links to third party websites and mobile applications that are not operated by us. We strongly advise you to review the Privacy Policy of every site you visit.
                            </p>
                        </section>

                        {/* 7. Changes to Policy */}
                        <section id="changes" className="scroll-mt-24 space-y-6">
                            <div className="flex items-center gap-3">
                                <RefreshCw className="text-primary w-6 h-6" />
                                <h2 className="text-2xl font-bold">7. Changes to This Privacy Policy</h2>
                            </div>
                            <p className="text-muted-foreground">
                                We reserve the right to update or change our Privacy Policy at any time and you are advised to review this Privacy Policy periodically for any changes.
                            </p>
                        </section>

                        {/* 8. Intellectual Property */}
                        <section id="ip" className="scroll-mt-24 space-y-6">
                            <div className="flex items-center gap-3">
                                <Copyright className="text-primary w-6 h-6" />
                                <h2 className="text-2xl font-bold">8. Intellectual Property Protection</h2>
                            </div>
                            <p className="text-muted-foreground">
                                Pankhuri is an intellectual property of the Company, all materials on the Platform are protected by copyright laws, trademark laws, and other intellectual property laws.
                            </p>
                        </section>

                        {/* 9. Contact Us */}
                        <section id="contact" className="scroll-mt-24 space-y-6">
                            <div className="flex items-center gap-3">
                                <Mail className="text-primary w-6 h-6" />
                                <h2 className="text-2xl font-bold">9. Contact Us</h2>
                            </div>
                            <p className="text-muted-foreground">
                                If you have any questions about this Privacy Policy, please contact us by email: <a href="mailto:social@pankhuri.co" className="text-primary font-medium hover:underline">social@pankhuri.co</a>
                            </p>
                        </section>

                    </div>
                </div>
            </div>

            {/* Trust Footer */}
            <footer className="w-full py-20 bg-muted/50 border-t border-border/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
                    <div className="flex justify-center -space-x-2">
                        {['P', 'A', 'N', 'K', 'H', 'U', 'R', 'I'].map((i, index) => (
                            <div key={index} className="w-10 h-10 rounded-full border-2 border-background bg-card flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{i}</div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-2">
                        <p className="text-foreground font-bold italic">Safe, Secure & Transparent Learning Platform.</p>
                        <p className="text-xs text-muted-foreground max-w-md mx-auto">
                            We respect your data rights. By using our platform, you acknowledge our processing practices.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}