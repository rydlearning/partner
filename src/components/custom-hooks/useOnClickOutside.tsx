import { useEffect } from "react";

export default function useOnClickOutside(ref: any, handler: any) {
  useEffect(
    () => {
      const listener = (event: any) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref?.current?.contains(event.target)) {
          // if()
          return;
        }
        handler(event);
      };

      document?.addEventListener("mousedown", listener);
      document?.addEventListener("touchstart", listener);

      return () => {
        document?.removeEventListener("mousedown", listener);
        document?.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because the passed-in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler],
  );
}
