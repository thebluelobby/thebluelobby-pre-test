import { useState, useEffect, ReactNode, useCallback } from "react";
import Box from "@mui/material/Box";

import { useListOption } from "../context/ListOptionContext";

function InfiniteScrollComponent({
  children,
  maxPage,
}: {
  children: ReactNode;
  maxPage: number | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const { state, dispatch } = useListOption();

  const observerCallback = useCallback(
    (entries) => {
      const target = entries[0];
      if (!isLoading && target.isIntersecting && state.page < maxPage) {
        console.log("hello", maxPage);
        setIsLoading(true);
        dispatch({
          type: "update-options",
          payload: {
            ...state,
            page: state?.page + 1,
          },
        });
      } else {
        setIsLoading(false);
      }
    },
    [state, dispatch, maxPage, isLoading]
  );

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "120px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    const sentinel = document.getElementById("sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [observerCallback]);

  return (
    <Box
      sx={{
        height: "80vh",
        overflow: "scroll",
        border: "2px solid #f5f5f5",
        borderRadius: "8px",
      }}
    >
      {children}
      {isLoading && maxPage > state.page && <div>Loading...</div>}
      <div id="sentinel"></div>
    </Box>
  );
}

export default InfiniteScrollComponent;
