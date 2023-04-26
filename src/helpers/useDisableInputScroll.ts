import { type RefObject, useEffect } from "react";

function useDisableScrollOnInput(
  ref: RefObject<HTMLInputElement> | RefObject<HTMLInputElement>[]
) {
  useEffect(() => {
    const refs = Array.isArray(ref) ? ref : [ref];

    refs.forEach((currentRef) => {
      const inputEl = currentRef.current;
      if (inputEl) {
        const handleWheel = (e: WheelEvent) => {
          e.preventDefault();
        };
        inputEl.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
          inputEl.removeEventListener("wheel", handleWheel);
        };
      }
    });
  }, [ref]);
}

export default useDisableScrollOnInput;
