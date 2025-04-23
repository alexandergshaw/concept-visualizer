'use client';

import React, { useState, useEffect } from 'react';
import '../../styles/javascript.css';

export interface SidebarItem {
  label: string;
  value: string;
  children?: SidebarItem[];
}

interface SidebarProps {
  title: string;
  items: SidebarItem[];
  onSelect?: (value: string) => void;
  defaultOpen?: string[];
}

export default function Sidebar({ title, items, onSelect, defaultOpen = [] }: SidebarProps) {
  const [open, setOpen] = useState<Set<string>>(new Set());

  // Initialize open state from defaultOpen prop
  useEffect(() => {
    setOpen(new Set(defaultOpen));
  }, [defaultOpen]);

  const toggle = (value: string) => {
    setOpen(prev => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  return (
    <aside className="js-sidebar">
      <h2 className="js-sidebar-title">{title}</h2>
      <ul className="js-nav-list">
        {items.map((item) => {
          const isOpen = open.has(item.value);
          return (
            <li key={item.value} className="js-nav-group">
              <button
                className={`js-nav-item hoverable ${item.children ? 'js-nav-parent' : ''}`}
                onClick={() => item.children && toggle(item.value)}
                aria-expanded={isOpen}
              >
                <span>{item.label}</span>
                {item.children && (
                  <span className={`chevron ${isOpen ? 'rotate' : ''}`}>›</span>
                )}
              </button>

              {item.children && (
                <ul className={`js-sublist ${isOpen ? 'expanded' : 'collapsed'}`}>
                  {item.children.map((sub) => (
                    <li key={sub.value}>
                      <button
                        className="js-nav-subitem hoverable"
                        onClick={() => onSelect?.(sub.value)}
                      >
                        {sub.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
