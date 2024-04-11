"use client"
import { Languages } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

// TOGGLE LANG COMPONENT UTILS
import { usePathname, useRouter } from '@/utils/next-intl-navigation';

// TOGGLE LANG COMPONENT
export const ToggleLang = () => {
    /* Hooks */
    const pathname = usePathname();
    const router = useRouter();

    /* Renders */
    return (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
                className="rounded-md p-1 bg-light-border dark:bg-light-text shadow-xl outline-none"
                aria-label="change language"
            >
                <Languages className='h-5 w-5 text-light-text dark:text-dark-text' />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
                className="z-50 flex flex-col gap-2 w-44 p-2 shadow-xl bg-light-border dark:bg-light-text rounded-md"
                sideOffset={10}
                side='bottom'
                align='end'
            >
              <DropdownMenu.Item>
                <button
                    className="rounded-md p-1 w-full text-left text-light-text dark:text-dark-text transition-all duration-300 hover:bg-light-background hover:dark:bg-dark-background outline-none"
                    aria-label="english"
                    onClick={() => router.push(pathname, { locale: "en" })}
                >
                    English
                </button>
              </DropdownMenu.Item>

              <DropdownMenu.Item>
                <button
                    className="rounded-md p-1 w-full text-left text-light-text dark:text-dark-text transition-all duration-300 hover:bg-light-background hover:dark:bg-dark-background outline-none"
                    aria-label="portuguese"
                    onClick={() => router.push(pathname, { locale: "pt" })}
                >
                    Português
                </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}
