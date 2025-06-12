import { useEffect } from 'react';

export const useBeforeUnloadWarning = (enabled: boolean) => {
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        if (!enabled) return;

        e.preventDefault();
        (e as any).returnValue = ''; 
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [enabled]);
};
