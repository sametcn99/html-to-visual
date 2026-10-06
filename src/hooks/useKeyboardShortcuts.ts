'use client';

import { useEffect } from 'react';
import { useStudioStore } from '@/store/useStudioStore';

export function useKeyboardShortcuts(onRender: () => void) {
  const { setActiveModal, activeModal } = useStudioStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;

      // Ctrl + Enter => Trigger Render
      if (isCmdOrCtrl && e.key === 'Enter') {
        e.preventDefault();
        onRender();
        return;
      }

      // Escape => Close current modal
      if (e.key === 'Escape') {
        if (activeModal) {
          e.preventDefault();
          setActiveModal(null);
        }
        return;
      }

      // Shift + ? => Open shortcuts modal
      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        // Only if not currently typing in an input/textarea
        const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
        if (tag !== 'input' && tag !== 'textarea') {
          e.preventDefault();
          setActiveModal(activeModal === 'shortcuts' ? null : 'shortcuts');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRender, activeModal, setActiveModal]);
}
