import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'pt'] as const;

export const { usePathname, useRouter, Link, redirect } = createSharedPathnamesNavigation( { locales });
