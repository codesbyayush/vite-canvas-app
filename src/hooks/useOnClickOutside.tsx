import { useEffect } from "react";

// Improved version of https://usehooks.com/useOnClickOutside/

const useOnClickOutside = (
  ref: React.MutableRefObject<HTMLElement | null>, // Adjusted type for ref
  handler: () => void
) => {
  useEffect(() => {
    let startedInside = false;
    let startedWhenMounted = false;

    const listener = (event: MouseEvent) => {
      // Ensure event.target is a Node
      const target = event.target as Node;

      // Do nothing if `mousedown` or `touchstart` started inside ref element
      if (startedInside || !startedWhenMounted) return;
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(target)) return;

      handler();
    };

    const validateEventStart = (event: TouchEvent | MouseEvent) => {
      const target = event.target as Node; // Ensure event.target is a Node
      startedWhenMounted = !!ref.current;
      startedInside = ref.current !== null && ref.current.contains(target);
    };

    document.addEventListener("mousedown", validateEventStart);
    document.addEventListener("touchstart", validateEventStart);
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("mousedown", validateEventStart);
      document.removeEventListener("touchstart", validateEventStart);
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
