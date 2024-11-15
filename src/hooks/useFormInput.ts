import { useEffect, useRef } from "react";

export function useSubmitOnEnter(onSubmit: () => Promise<void>) {
  useEffect(() => {
    const keyPressHandler = (event: KeyboardEvent) => {
      if (event.code === "Enter") {
        onSubmit();
      }
    };
    document.addEventListener("keyup", keyPressHandler);

    return () => {
      document.removeEventListener("keyup", keyPressHandler);
    };
  }, [onSubmit]);
}

export function useAutoFocus(isOpen: boolean) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [isOpen]);

  return { inputRef };
}
