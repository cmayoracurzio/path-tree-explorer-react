import { useState, useEffect } from "react";

/**
 * Mock fetch function that mimics fetching paths with a delay.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of paths.
 */
const fetchPaths = async (): Promise<string[]> => {
  const newPaths = await new Promise<string[]>((resolve) =>
    setTimeout(() => {
      resolve([
        "/",
        "/hello/example",
        "hello/cheddar",
        "/elephant/animal/zoo",
        "elephant/plants",
        "elephant/animal/building",
      ]);
    }, 1000)
  );
  return newPaths;
};

/**
 * `usePaths` - A custom hook that fetches and provides path data, as well as loading and error states.
 *
 * This hook fetches paths data, handles possible errors during fetching, and provides a way to track
 * the loading state of the data. The fetched data is returned as a structured object containing
 * the paths, error, and loading states.
 *
 * @returns An object containing the fetched paths, and states for loading and errors.
 *
 * @example
 * const { paths, isError, isLoading } = usePaths();
 */
const usePaths = (): {
  paths: string[];
  isError: boolean;
  isLoading: boolean;
} => {
  const [paths, setPaths] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const loadPaths = async () => {
      try {
        const newPaths = await fetchPaths();
        if (isMounted) {
          setPaths(newPaths);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    loadPaths();

    // Cleanup function to handle unmounting
    return () => {
      isMounted = false;
    };
  }, []);

  return { paths, isError, isLoading };
};

export default usePaths;
