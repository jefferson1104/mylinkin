import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import * as SwitchRadix from '@radix-ui/react-switch';

// CONTEXTS
import { useTheme } from '../../contexts/theme-context';

// TOGGLE THEME COMPONENT
export const ToggleTheme = () => {
    /* States */
    const { theme, setTheme } = useTheme();
    const [isChecked, setIsChecked] = useState(false);

    /* Handlers */
    const toggleSwitch = () => {
        setIsChecked(!isChecked);
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    /* Renders */
    return (
        <SwitchRadix.Root
            className="w-11 h-6 rounded-full relative shadow-xl bg-dark-text dark:bg-light-text"
            checked={isChecked}
            onCheckedChange={toggleSwitch}
        >
            <SwitchRadix.Thumb className={`bg-light-background dark:bg-dark-background block w-5 h-5 rounded-full shadow transition-transform duration-100 transform ${isChecked ? 'translate-x-5' : 'translate-x-1'} will-change-transform flex justify-center items-center`}>
                {isChecked ? <Moon size={16} className='text-dark-text' /> : <Sun size={16} className='text-light-text' />}
            </SwitchRadix.Thumb>
        </SwitchRadix.Root>
    );
}
