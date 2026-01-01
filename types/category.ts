// types/category.ts

export interface CategoryPricing {
    id: string;
    name: string;
    slug: string;
    description: string;
    subscriptionType: 'monthly' | 'yearly' | 'lifetime';
    duration: number | null;
    price: number;
    discountedPrice: number;
    currency: string;
    provider: string;
    planId: string | null;
    trialDays: number;
    trialFee: number;
    features: string[] | null;
    isActive: boolean;
    order: number | null;
    planType: 'CATEGORY' | 'COURSE';
    targetId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    id: string;
    parentId: string | null;
    name: string;
    slug: string;
    description: string;
    icon: string | null;
    status: 'active' | 'inactive';
    sequence: number;
    createdAt: string;
    updatedAt: string;
    parent?: {
        id: string;
        name: string;
        slug: string;
    } | null;
    _count: {
        courses: number;
        children: number;
    };
    isPaid: boolean;
    hasAccess: boolean;
    pricing: CategoryPricing[];
}
