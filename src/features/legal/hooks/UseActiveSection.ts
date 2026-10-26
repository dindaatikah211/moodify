"use client";

import { useEffect, useState } from "react";

const OBSERVER_OPTIONS = { rootMargin: "-30% 0px -60% 0px" };

export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) {
        setActiveId(visible.target.id);
      }
    }, OBSERVER_OPTIONS);

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}