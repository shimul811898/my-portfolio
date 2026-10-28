"use client";

import { addToast as heroAddToast, closeToast, closeAll } from "@heroui/toast";

/**
 * HeroUI Toast helper utility.
 * Can be called anywhere in client components.
 * e.g.
 *   toast.success("Successfully saved!");
 *   toast.error("Failed to update project", "Please check your network");
 *   toast.warning("Warning message");
 *   toast.info("Information");
 */
export const toast = {
  success: (title, description = "") => {
    return heroAddToast({
      title,
      description: description || undefined,
      color: "success",
      timeout: 3500,
    });
  },

  error: (title, description = "") => {
    return heroAddToast({
      title,
      description: description || undefined,
      color: "danger",
      timeout: 4500,
    });
  },

  warning: (title, description = "") => {
    return heroAddToast({
      title,
      description: description || undefined,
      color: "warning",
      timeout: 4000,
    });
  },

  info: (title, description = "") => {
    return heroAddToast({
      title,
      description: description || undefined,
      color: "primary",
      timeout: 3500,
    });
  },

  custom: (options) => {
    return heroAddToast(options);
  },

  close: (key) => closeToast(key),
  closeAll: () => closeAll(),
};

export { heroAddToast as addToast, closeToast, closeAll };
export default toast;
