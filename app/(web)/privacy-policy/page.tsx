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
    Bell,
    Lock,
    Cookie,
    Trash2,
    Scale,
    Star,
    ChevronRight,
    AlertCircle,
    Clock,
    ExternalLink,
    MapPin,
    Phone,
    Building2,
    FileText,
    Globe,
    Users
} from "lucide-react";

export default function PrivacyPolicy() {
    const sections = [
        { id: "information-rights", title: "5.1. Right to Information", icon: <Eye className="w-5 h-5" /> },
        { id: "purpose", title: "5.2. Data Purpose", icon: <Info className="w-5 h-5" /> },
        { id: "consent", title: "5.4. User Consent", icon: <Fingerprint className="w-5 h-5" /> },
        { id: "security-cookies", title: "5.6 & 5.7. Security & Cookies", icon: <Lock className="w-5 h-5" /> },
        { id: "access-delete", title: "5.8. Data Rights", icon: <Trash2 className="w-5 h-5" /> },
        { id: "rating-feedback", title: "5.10. Rating Disputes", icon: <Star className="w-5 h-5" /> },
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
                        Privacy Repository
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
                        Your privacy is our priority. This policy outlines how pankhuri.co collects, uses, and protects your personal data.
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
                                    <a href="mailto:support@pankhuri.co" className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                                        Privacy Support
                                    </a>
                                </CardContent>
                            </Card>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-24 pb-20">
                        {/* Introduction Card */}
                        <section className="space-y-8">
                            <Card className="border-none shadow-xl shadow-black/[0.02] bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden">
                                <CardContent className="p-8 md:p-12 space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div className="space-y-4">
                                            <h2 className="text-2xl font-bold tracking-tight">Legal Context & Compliance</h2>
                                            <div className="space-y-4 text-muted-foreground leading-relaxed text-justify">
                                                <p>
                                                    This policy of protection of personal data governs the access and use of the services contained on the Website by the Users as owners of the data worthy of protection in accordance applicable law.
                                                </p>
                                                <p>
                                                    pankhuri.co complies with applicable legislations regarding the protection of personal data and the confidentiality requirements of its activity.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Section 5.1: Right to Information */}
                        <section id="information-rights" className="scroll-mt-24 space-y-10">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase tracking-tighter">5.1. Right to Information</h2>
                                <p className="text-muted-foreground">Transparency in data collection and ownership.</p>
                            </div>

                            <div className="prose prose-p:text-muted-foreground max-w-none space-y-6">
                                <p>
                                    pankhuri.co, as the owner of the website, informs the user about the existence of files with personal data created by it and under its responsibility.
                                </p>
                                <div className="bg-muted/50 p-6 rounded-2xl border border-border/50">
                                    <h4 className="font-bold text-foreground mb-3 uppercase text-xs tracking-widest bg-background w-fit px-2 py-1 rounded border border-border/50">Registration Requirement</h4>
                                    <p className="text-sm italic">
                                        Users who decide to use the services offered and fill in the registration form must provide the data considered necessary to achieve the Website's purpose, which to facilitate a meeting between companies and users. Registered data is included in the file "Users", duly registered with the Data Protection Agency.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 5.2: Purpose */}
                        <section id="purpose" className="scroll-mt-24 space-y-10">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase tracking-tighter">5.2. Data Purpose</h2>
                                <p className="text-muted-foreground">Why we collect and how we utilize your information.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { text: "Enable quick and easy searches for companies by location and industry.", icon: <Globe className="w-4 h-4" /> },
                                    { text: "Publicize products and services via vendor profiles and photography.", icon: <Eye className="w-4 h-4" /> },
                                    { text: "Facilitate direct contact between advertisers and interested users.", icon: <Phone className="w-4 h-4" /> },
                                    { text: "Creation of public personal files accessible to other platform users.", icon: <Users className="w-4 h-4" /> },
                                    { text: "Provide wedding planning information through curated articles and tips.", icon: <FileText className="w-4 h-4" /> },
                                    { text: "Participation in the Website Community and forum interaction.", icon: <Star className="w-4 h-4" /> },
                                    { text: "Helpline assistance for selections and selecting specific suppliers.", icon: <MapPin className="w-4 h-4" /> },
                                    { text: "Promotional and informative electronic communications (Newsletters).", icon: <Bell className="w-4 h-4" /> }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-5 rounded-2xl bg-card border border-border/50 shadow-sm group hover:border-primary/30 transition-all">
                                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                                            {item.icon}
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 5.3: Nature of Info */}
                        <section className="scroll-mt-24 space-y-8">
                            <div className="p-8 rounded-[2rem] bg-foreground text-background space-y-6 shadow-2xl">
                                <h3 className="text-xl font-bold flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-primary" /> 5.3. Mandatory vs Optional Data
                                </h3>
                                <p className="text-sm opacity-80 leading-relaxed">
                                    Fields marked with an asterisk (*) in the registration form are strictly necessary. The User guarantees all provided data is truthful and up to date. Users are solely responsible for inaccuracies that may cause damages to pankhuri.co or third parties.
                                </p>
                            </div>
                        </section>

                        {/* Section 5.4: User Consent */}
                        <section id="consent" className="scroll-mt-24 space-y-10">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase tracking-tighter">5.4. User Consent</h2>
                                <p className="text-muted-foreground">Agreement to terms and public visibility profiles.</p>
                            </div>

                            <Card className="border-none bg-accent/5 rounded-[2.5rem] overflow-hidden">
                                <CardContent className="p-8 md:p-12 space-y-8">
                                    <div className="flex gap-4 items-start p-6 bg-background rounded-2xl border border-border/50">
                                        <Fingerprint className="w-8 h-8 text-primary flex-shrink-0" />
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            By providing data, the User states to have read and accepted the legal terms. Consent is given for processing personal data in accordance with our provided services. **User photos and profiles are publicly visible to other users and search engines by default.**
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-muted-foreground">
                                        <div className="space-y-3">
                                            <span className="font-bold text-foreground uppercase tracking-widest text-[10px]">Account Cancellation</span>
                                            <p>When an account is cancelled, identifying info (name, email, photo) is erased. However, other published content will remain on the Website.</p>
                                        </div>
                                        <div className="space-y-3">
                                            <span className="font-bold text-foreground uppercase tracking-widest text-[10px]">Data Transfer</span>
                                            <p>Users consent to the transfer of data to other users and entities utilizing pankhuri.co services for professional matching.</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Section 5.5: Electronic Communications */}
                        <section className="scroll-mt-24 space-y-8">
                            <div className="flex items-center gap-4 border-b border-border/50 pb-6">
                                <Bell className="w-10 h-10 text-primary" />
                                <div>
                                    <h2 className="text-2xl font-bold">5.5. Electronic Communications</h2>
                                    <p className="text-sm text-muted-foreground">Express consent for news and promotional updates.</p>
                                </div>
                            </div>
                            <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 leading-relaxed text-muted-foreground text-sm space-y-4">
                                <p>Registering constitutes acceptance of receiving Newsletter updates and promotional services from pankhuri.co partners relevant to the weddings sector.</p>
                                <div className="flex flex-col md:flex-row gap-4 pt-2">
                                    <div className="flex-1 p-4 bg-background rounded-xl border border-border/50 font-medium">1. Disable via "My Account" Notification menu</div>
                                    <div className="flex-1 p-4 bg-background rounded-xl border border-border/50 font-medium">2. Unsubscribe link in any electronic mail</div>
                                </div>
                            </div>
                        </section>

                        {/* Section 5.6 & 5.7: Security & Cookies */}
                        <section id="security-cookies" className="scroll-mt-24 space-y-10">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase tracking-tighter">5.6 & 5.7. Security & Cookies</h2>
                                <p className="text-muted-foreground">Technical measures and tracking technologies used.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Card className="bg-primary shadow-2xl border-none shadow-primary/20 rounded-[2rem] overflow-hidden group">
                                    <CardContent className="p-10 space-y-6 text-primary-foreground">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-4">
                                            <Lock className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold">5.6. Technical Security</h3>
                                        <p className="text-xs opacity-80 leading-relaxed">
                                            We adopt technical and organizational measures to ensure personal data security and avoid alteration, loss, or unauthorized access, in accordance with applicable legislative requirements.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-card border border-border/50 rounded-[2rem] overflow-hidden">
                                    <CardContent className="p-10 space-y-6">
                                        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                                            <Cookie className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold">5.7. Cookies and IPs</h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            We use cookies and IP tracking for statistical purposes (visit dates, browser info, resolution). You may deactivate cookies via your Internet browser settings. We do not use "spamming" techniques.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        {/* Section 5.8: Rights */}
                        <section id="access-delete" className="scroll-mt-24 space-y-10">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase tracking-tighter">5.8. Access & Correction Rights</h2>
                                <p className="text-muted-foreground">Complete control over your personal data footprint.</p>
                            </div>

                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {["Right to Access", "Right to Correct", "Right to Delete"].map(right => (
                                        <div key={right} className="p-6 rounded-2xl bg-muted/50 border border-border/50 flex flex-col items-center text-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            <span className="font-bold text-sm">{right}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-background rounded-3xl border-2 border-foreground p-8 md:p-12 space-y-8">
                                    <h3 className="text-xl font-black uppercase italic tracking-widest text-primary">Inquiry & Official Support</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Building2 className="w-5 h-5 text-primary" />
                                                <span className="font-bold">Registered Office</span>
                                            </div>
                                            <address className="not-italic text-sm text-muted-foreground space-y-1">
                                                RP Cube Private Limited (pankhuri.co)<br />
                                                Room #1, 161, Chandra Shekhar Azad,<br />
                                                Jhansi, Uttar Pradesh, India - 284002.
                                            </address>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Mail className="w-5 h-5 text-primary" />
                                                <span className="font-bold">Process Disputes</span>
                                            </div>
                                            <div className="text-sm text-muted-foreground space-y-2">
                                                <p className="flex items-center gap-2 font-medium">Email: <a href="mailto:support@pankhuri.co" className="text-primary hover:underline">support@pankhuri.co</a></p>
                                                <p className="flex items-center gap-2 font-medium">Phone: 06364047530</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 5.10: Rating & Review */}
                        <section id="rating-feedback" className="scroll-mt-24 space-y-12">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase tracking-tighter">5.10. Rating & Review Disputes</h2>
                                <p className="text-muted-foreground">Guidelines for feedback integrity and vendor reviews.</p>
                            </div>

                            <Card className="border-none bg-foreground shadow-2xl rounded-[3rem] overflow-hidden">
                                <CardContent className="p-8 md:p-16 space-y-12 text-background">
                                    <div className="space-y-4">
                                        <p className="text-sm opacity-60 uppercase font-black tracking-widest">Integrity Protection</p>
                                        <h3 className="text-3xl font-bold tracking-tight">Feedback Audit System</h3>
                                        <p className="text-sm opacity-70 leading-relaxed text-slate-300">
                                            Vendor User acknowledges that Rating and Review ("feedback") consists of opinions left by other Users and a machine calculated feedback score. pankhuri.co does not make judgments on the truth or accuracy of opinions or statements.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-10">
                                        <div className="space-y-6">
                                            <h4 className="font-bold text-primary flex items-center gap-2">
                                                <ShieldCheck className="w-5 h-5" /> Removal Scenarios
                                            </h4>
                                            <ul className="space-y-3 text-xs opacity-70 list-decimal list-inside marker:font-black">
                                                <li>Profane, vulgar, or discriminatory language</li>
                                                <li>Court ordered removal or modification</li>
                                                <li>Reference to law enforcement involvement</li>
                                                <li>Solicitation of contact info for spam/junk mail</li>
                                                <li>Failure to validate business within two months</li>
                                                <li>Personally identifiable information of any kind</li>
                                            </ul>
                                        </div>
                                        <div className="space-y-6">
                                            <h4 className="font-bold text-primary flex items-center gap-2">
                                                <AlertCircle className="w-5 h-5" /> Mandatory Rules
                                            </h4>
                                            <div className="space-y-4 text-xs opacity-70 leading-relaxed">
                                                <p>Users may only leave **one feedback item per unique transaction**. Neutral or Negative feedback must include proof of business (cashed check, receipt, paid invoice).</p>
                                                <p>All feedback is subject to **compliance audit** and may be permanently removed if it undermines the system integrity.</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </div>
                </div>
            </div>

            {/* Trust Footer */}
            <footer className="w-full py-20 bg-muted/50 border-t border-border/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
                    <div className="flex justify-center -space-x-2">
                        {['P', 'A', 'N', 'K', 'H', 'U', 'R', 'I'].map((i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-card flex items-center justify-center overflow-hidden">
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