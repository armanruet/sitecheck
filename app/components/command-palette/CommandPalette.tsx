'use client';

import { Command } from 'cmdk';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { usePaletteOptions } from './usePaletteOptions';
import { BlogPost } from '../../blog/utils.server';

interface CommandPaletteProps {
  posts: BlogPost[];
}

export function CommandPalette({ posts }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const { options, handleSelect } = usePaletteOptions(posts);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Global Command Menu"
          className="fixed inset-0 p-4 pt-[20vh] bg-gray-900/50 backdrop-blur-sm z-50"
        >
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <Command.Input 
              placeholder="Search posts..."
              className="w-full px-4 py-3 text-base border-b border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none"
            />
            <Command.List className="max-h-[300px] overflow-y-auto p-2">
              <Command.Empty className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                No results found.
              </Command.Empty>
              {options.map((option) => (
                <Command.Item
                  key={option.id}
                  value={option.name}
                  onSelect={() => {
                    handleSelect(option.id);
                    setOpen(false);
                  }}
                  className="px-4 py-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  {option.name}
                </Command.Item>
              ))}
            </Command.List>
          </div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  );
}
