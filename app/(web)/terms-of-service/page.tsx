"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Building2,
    MapPin,
    Phone,
    Mail,
    ShieldCheck,
    Scale,
    Users,
    Globe,
    AlertCircle,
    Clock,
    ExternalLink,
    ChevronRight,
    FileText,
    Info,
    Link as LinkIcon,
    Gavel
} from "lucide-react";

export default function TermsOfService() {
    const sections = [
        { id: "legal-info", title: "1. Legal Information", icon: <Building2 className="w-5 h-5" /> },
        { id: "general-terms", title: "2. General Terms of Use", icon: <Globe className="w-5 h-5" /> },
        { id: "community-terms", title: "3. Community Service Terms", icon: <Users className="w-5 h-5" /> },
        { id: "intellectual-property", title: "4. Intellectual Property", icon: <ShieldCheck className="w-5 h-5" /> },
        { id: "nondiscrimination", title: "5. Nondiscrimination", icon: <Scale className="w-5 h-5" /> },
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
                        Legal Compliance
                    </Badge>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground balance">
                        Terms of <span className="text-primary relative inline-block">
                            Service
                            <svg className="absolute -bottom-2 left-0 w-full h-2 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 25 0 50 5 Q 75 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </span>
                    </h1>
                    <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
                        Effective as of February 13, 2026. These terms govern your interaction with the pankhuri.co platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Quick Nav Sidebar */}
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24 space-y-8">
                            <div className="space-y-1">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 px-4">Sections</h3>
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
                                        <AlertCircle className="w-5 h-5" />
                                        <span className="font-bold text-sm">Legal Help</span>
                                    </div>
                                    <p className="text-xs text-primary/80 leading-relaxed">
                                        For inquiries regarding our legal policies, please contact our support desk.
                                    </p>
                                    <a href="mailto:support@pankhuri.co" className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                                        Mail Support
                                    </a>
                                </CardContent>
                            </Card>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-24 pb-20">
                        {/* Preamble */}
                        <section className="space-y-8">
                            <Card className="border-none shadow-xl shadow-black/[0.02] bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden">
                                <CardContent className="p-8 md:p-12 space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div className="space-y-4">
                                            <h2 className="text-2xl font-bold tracking-tight">Electronic Contract Information</h2>
                                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                                <p>
                                                    This document is an electronic record in the form of an electronic contract formed under the Information Technology Act, 2000 and rules thereunder and the amended provisions relating to electronic documents / records in various statues as amended by the Information Technology Act, 2000. These terms do not require any physical, electronic, or digital signature.
                                                </p>
                                                <p>
                                                    This document is published in accordance with the provisions of Rule 3(1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of the <a href="http://www.pankhuri.co" className="text-primary hover:underline font-bold">www.pankhuri.co</a> Website.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Section 1: Legal Info */}
                        <section id="legal-info" className="scroll-mt-24 space-y-10">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase">1. Legal Information</h2>
                                <p className="text-muted-foreground">Company and operator details for pankhuri.co</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                                        <h3 className="text-sm font-black text-primary/60 uppercase tracking-widest mb-4">Entity Identity</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-1">Company Name</p>
                                                <p className="font-bold text-lg">RP Cube Private Limited</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-1">Corporate Identity Number (CIN)</p>
                                                <p className="font-mono text-xs bg-muted px-2 py-1 rounded w-fit">U52339UP2019PTC121387</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
                                        <h3 className="text-sm font-black text-primary/60 uppercase tracking-widest mb-4">Contact Channels</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <Phone className="w-4 h-4 text-primary" />
                                                <span className="font-medium">06364047530</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Mail className="w-4 h-4 text-primary" />
                                                <a href="mailto:ps@pankhuri.co" className="font-medium hover:text-primary transition-colors">ps@pankhuri.co</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-sm font-black text-primary/60 uppercase tracking-widest mb-6 border-b border-border/50 pb-2">Registered Address</h3>
                                        <address className="not-italic space-y-2 text-lg text-foreground leading-relaxed font-medium">
                                            Room #1, 161,<br />
                                            Chandra Shekhar Azad,<br />
                                            Jhansi, Uttar Pradesh,<br />
                                            India, 284002.
                                        </address>
                                    </div>
                                    <div className="mt-8 p-4 bg-primary/5 rounded-xl flex items-center gap-3 text-xs text-primary/80 font-medium">
                                        <MapPin className="w-4 h-4" />
                                        Verified Headquarters Location
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: General Terms */}
                        <section id="general-terms" className="scroll-mt-24 space-y-12">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase">2. General Terms of Use</h2>
                                <p className="text-muted-foreground">Rules governing the access and usage of the website and user information.</p>
                            </div>

                            <div className="space-y-16">
                                {/* 2.1 */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold flex items-center gap-3">
                                        <Badge variant="outline" className="rounded-md">2.1</Badge> Preamble
                                    </h3>
                                    <div className="text-muted-foreground leading-relaxed space-y-4 text-justify">
                                        <p>RP Cube Private Limited (hereinafter "pankhuri.co") makes the Website pankhuri.co (hereinafter the "Website") available to Internet users.</p>
                                        <p>The ones who use and access the Website will be automatically considered as Users. Therefore, both physical persons who use the Website as end user and legal persons who use it as part of their professional activities in relation to the services pankhuri.co offers to the professionals of the weddings sector.</p>
                                        <p>Access to and use of the Website imply full and unreserved acceptance by Users of the content of the "General Terms of Use", the "Personal Data Protection Policy" as well as, if necessary, the "Particular Conditions" that may complement, substitute or modify them in any way. The User may access, print, download and save the General Terms of Use at any time. These conditions will be permanently accessible on the Website through the link "Legal Conditions".</p>
                                        <p>pankhuri.co reserves the right to modify, without any prior notice, the content of the Legal Conditions and therefore recommends that Users thoroughly read the texts contained therein before accessing and using any services of the Website.</p>
                                    </div>
                                </div>

                                {/* 2.2 */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold flex items-center gap-3">
                                        <Badge variant="outline" className="rounded-md">2.2</Badge> Object
                                    </h3>
                                    <div className="text-muted-foreground leading-relaxed space-y-4">
                                        <p>The present General Terms of Use govern the access and use of the Website, which aims to be a reference point for those couples in the process of planning their wedding and for the providers of services associated with this type of event.</p>
                                        <p>In this regard, pankhuri.co puts providers and couples in touch through the Website, placing at their disposal interaction tools, offering providers an objective public interested in the products and services they provide, and offering couples the providers of products and services related to planning and organizing a wedding.</p>
                                        <p>pankhuri.co may, without prior notice, delete contents from the Website contrary to enforceable law or which would or could violate the rights of third parties, as well as contents that may be considered inappropriate or inadequate.</p>
                                    </div>
                                </div>

                                {/* 2.3 */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold flex items-center gap-3">
                                        <Badge variant="outline" className="rounded-md">2.3</Badge> Obligations of the Website Users
                                    </h3>
                                    <div className="text-muted-foreground leading-relaxed space-y-6">
                                        <p>The User agrees to make diligent use of the Website and the services accessible through it, in full compliance with the Law, good manners and these General Terms of Use.</p>
                                        <div className="bg-muted px-8 py-10 rounded-[2rem] border border-border/50 space-y-6">
                                            <h4 className="font-bold text-foreground flex items-center gap-2">
                                                <Info className="w-4 h-4 text-primary" /> Key User Commitments
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                                                {[
                                                    "Use of password is personal and non-transferable",
                                                    "Necessary measures for the custody of the chosen password",
                                                    "All information provided must be truthful and accurate",
                                                    "Maintain all information constantly up to date",
                                                    "Respect applicable laws and the rights of third parties",
                                                    "Abstain from using libelous or slanderous content",
                                                    "Do not use mechanisms, software or scripts to exploit the site",
                                                    "No overloading of the pankhuri.co infrastructure"
                                                ].map((item, idx) => (
                                                    <div key={idx} className="flex gap-4">
                                                        <div className="w-5 h-5 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-primary">{idx + 1}</div>
                                                        <p>{item}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 2.4 */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold flex items-center gap-3">
                                        <Badge variant="outline" className="rounded-md">2.4</Badge> Content Insertion Obligations
                                    </h3>
                                    <div className="text-muted-foreground leading-relaxed space-y-4">
                                        <p>By including information, text, audio, video and/or images on the Web Site, the User declares to be the legitimate holder of the intellectual property rights of such Content for the reproduction, distribution and public communication thereof.</p>
                                        <p className="p-4 bg-destructive/5 border border-destructive/10 rounded-xl text-sm text-destructive/80 italic">
                                            pankhuri.co does not allow the inclusion of content that reduces the quality of service, contradicts legality, honor, or violates the fundamental rights of individuals.
                                        </p>
                                        <p>Any Content provided by users will become part of the composite work that is the Web site as an object of intellectual property rights, whose sole shareholder is pankhuri.co.</p>
                                    </div>
                                </div>

                                {/* 2.5 & 2.6 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold">2.5. Data Distribution</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            pankhuri.co has no obligation to verify the identity of the users or the accuracy of data provided. However, it reserves the power to restrict access or delete content that harms property or rights of another.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold">2.6. Liability Disclaimer</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            pankhuri.co shall not be liable for the contents, data and/or information provided by users, nor for the contents of external websites to which it links. We moderate participate tools to prevent rights violations.
                                        </p>
                                    </div>
                                </div>

                                {/* 2.7 & 2.8 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold">2.7. Third Party Links</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed flex items-start gap-3">
                                            <LinkIcon className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                                            Links to sites owned by third parties are for information purposes only and in no way imply support or commercialization by pankhuri.co.
                                        </p>
                                    </div>
                                    <div className="space-y-4 bg-primary/5 p-6 rounded-2xl border border-primary/10">
                                        <h3 className="text-lg font-bold flex items-center gap-2">
                                            <Gavel className="w-5 h-5 text-primary" /> 2.8. Jurisdiction
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed underline underline-offset-4 decoration-primary/20">
                                            These Terms of Use are governed by Indian law. Users submit to the jurisdiction of the Courts of the state of Uttar Pradesh for any legal actions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Community */}
                        <section id="community-terms" className="scroll-mt-24 space-y-12">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase">3. Community Service Terms</h2>
                                <p className="text-muted-foreground">Guidelines for participation in the wedding community forums.</p>
                            </div>

                            <Card className="border-none bg-accent/5 rounded-[2.5rem] overflow-hidden">
                                <CardContent className="p-8 md:p-12 space-y-10">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold">3.1. Acceptance & Purpose</h3>
                                        <p className="text-muted-foreground leading-relaxed text-sm">
                                            pankhuri.co offers its Users the Community service so that couples in the process of planning their wedding can exchange views. In no case is the community allowed to be used as a platform for professionals unless specifically authorized.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4 p-6 bg-background rounded-2xl border border-border/50 shadow-sm">
                                            <h4 className="font-bold flex items-center gap-2 text-primary">
                                                <ShieldCheck className="w-4 h-4" /> 3.4. User Obligations
                                            </h4>
                                            <ul className="space-y-2 text-xs text-muted-foreground list-disc list-inside marker:text-primary">
                                                <li>Do not harass, stalk or threaten others</li>
                                                <li>No obscene or objectionable content</li>
                                                <li>No impersonation of team members</li>
                                                <li>No mass mailing or unsolicited spam</li>
                                                <li>No sale or promotion of products</li>
                                            </ul>
                                        </div>
                                        <div className="space-y-4 p-6 bg-background rounded-2xl border border-border/50 shadow-sm">
                                            <h4 className="font-bold flex items-center gap-2 text-primary">
                                                <AlertCircle className="w-4 h-4" /> 3.5. Dropcanvas Tool
                                            </h4>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                The community may use Dropcanvas for file storage. pankhuri.co is not responsible for the content of files attached to Dropcanvas. Use is at the user&apos;s own risk.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-border/50 flex flex-col md:flex-row gap-8 text-xs text-muted-foreground">
                                        <div className="flex-1 space-y-3">
                                            <span className="font-bold text-foreground">3.7. Personal Data</span>
                                            <p>Personal data is processed according to the Website&apos;s Protection Policy. Opinions contributed to the Website may be accessible by Internet search engines unless marked confidential.</p>
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <span className="font-bold text-foreground">3.8. Licensing</span>
                                            <p>Software license is granted only for execution of the services. No other license of intellectual property is granted on the Website itself or its content.</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Section 4: IP Rights */}
                        <section id="intellectual-property" className="scroll-mt-24 space-y-12">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase">4. Intellectual & Industrial Property</h2>
                                <p className="text-muted-foreground">Ownership rights and copyright protection policies.</p>
                            </div>

                            <Card className="border-2 border-foreground shadow-[10px_10px_0px_0px_rgba(var(--primary-rgb),0.1)] rounded-[2rem] overflow-hidden">
                                <CardContent className="p-8 md:p-12 space-y-8">
                                    <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
                                        <div className="w-24 h-24 rounded-[2rem] bg-foreground text-background flex items-center justify-center text-4xl font-black">©</div>
                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-bold uppercase tracking-tight">Copyright Statement</h3>
                                            <p className="font-black text-primary text-lg">RP Cube Private Limited. - All rights reserved.</p>
                                            <p className="text-muted-foreground leading-relaxed">
                                                This Web site is governed by Indian laws and is protected by national and international legislation on intellectual and industrial property. The texts, designs, images, databases, logos, structure and brands are protected.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-muted rounded-2xl space-y-6">
                                        <h4 className="font-bold uppercase text-xs tracking-widest opacity-60">Infringement Notification Procedure</h4>
                                        <p className="text-sm text-muted-foreground">To report a violation of your rights, please provide written notification to:</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                                            <div className="space-y-1.5 px-4 border-l border-primary/30">
                                                <p className="font-bold text-foreground">Mailing Address</p>
                                                <p>RP Cube Private Limited (pankhuri.co)</p>
                                                <p>Room #1, 161, Chandra Shekhar Azad,</p>
                                                <p>Jhansi, Uttar Pradesh, India, 284002.</p>
                                            </div>
                                            <div className="space-y-1.5 px-4 border-l border-primary/30">
                                                <p className="font-bold text-foreground">Electronic Notification</p>
                                                <p>Email: ps@pankhuri.co</p>
                                                <p>Telephone: 06364047530</p>
                                            </div>
                                        </div>
                                        <div className="bg-background/50 p-4 rounded-xl text-xs text-muted-foreground border border-border/50">
                                            <strong>Required Data:</strong> Identification of rights holder, location of infringing content, proof of ownership, and a declaration of accuracy.
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Section 5: Nondiscrimination Policy */}
                        <section id="nondiscrimination" className="scroll-mt-24 space-y-12">
                            <div className="flex flex-col space-y-2 border-l-4 border-primary pl-6">
                                <h2 className="text-3xl font-black tracking-tight uppercase">5. Nondiscrimination Policy</h2>
                                <p className="text-muted-foreground">Inclusivity and anti-discrimination standards.</p>
                            </div>

                            <Card className="border-none bg-primary/5 rounded-[2.5rem] overflow-hidden">
                                <CardContent className="p-8 md:p-12 space-y-8">
                                    <div className="space-y-4 text-justify">
                                        <p className="text-muted-foreground leading-relaxed">
                                            pankhuri.co wants all couples and vendors to feel welcome and included on its Web sites, applications, and tools (the “Properties”).
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Accordingly, pankhuri.co prohibits discrimination against couples, guests, vendors, or employees of pankhuri.co based on race, color, religion, sex, national origin, ancestry, disability, marital, family, pregnancy status, sexual orientation, gender identity, gender expression, veteran or citizenship status, age, or any other characteristic protected under applicable federal, regional, state, or local law.
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Such discrimination includes, but is not limited to, refusing to provide or accept services or any other conduct that improperly takes into account these characteristics.
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed">
                                            As further addressed in our Terms of Use, this prohibition applies to the posting of discriminatory content, such as reviews or forum posts, on our Properties. pankhuri.co will, at its discretion, take steps to enforce this policy, up to and including suspending vendors and users who violate this policy from our Properties.
                                        </p>
                                    </div>

                                    <div className="p-6 bg-background rounded-2xl border border-border/50 shadow-sm flex items-start gap-4">
                                        <AlertCircle className="w-6 h-6 text-primary flex-shrink-0" />
                                        <div className="space-y-2">
                                            <h4 className="font-bold text-foreground">Reporting Discrimination</h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                If you experience discrimination with any user or vendor, please contact <a href="mailto:support@pankhuri.co" className="text-primary font-bold hover:underline">support@pankhuri.co</a>, with the subject <strong>“Nondiscrimination Policy”</strong>, so we can investigate and take appropriate measures.
                                            </p>
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
                        <p className="text-foreground font-bold italic">Empowering women with skills that matter.</p>
                        <p className="text-xs text-muted-foreground max-w-md mx-auto">
                            By continued use of this platform, you acknowledge that you have read and understood our legal agreements.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}