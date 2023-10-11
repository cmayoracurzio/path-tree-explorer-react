import { useState, useEffect } from "react";
import { TreeNodeStructure } from "../types/TreeNodeStructure";
import { convertPathsToTrees } from "../lib/utils";

/**
 * `useTrees` - A custom hook that processes path data and generates tree structures.
 *
 * This hook takes a string representation of path data, parses it, and converts it into tree structures.
 * It also handles possible errors during parsing and provides a way to track the processing state.
 * The returned data is structured to contain the tree structures, error state, and loading state.
 *
 * @param pathsString - A stringified version of an array of paths.
 * @returns An object containing the generated trees, and states for loading and errors.
 *
 * @example
 * const { trees, isError, isLoading } = useTrees('["/root/test", "/dev/null", "/root/something/somewhere"]');
 */
const useTrees = (
  pathsString: string
): {
  trees: Record<string, TreeNodeStructure> | null;
  isError: boolean;
  isLoading: boolean;
} => {
  const [trees, setTrees] = useState<Record<string, TreeNodeStructure> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    try {
      const parsedPaths = JSON.parse(pathsString);
      if (
        Array.isArray(parsedPaths) &&
        parsedPaths.every((item) => typeof item === "string")
      ) {
        const trees = convertPathsToTrees(parsedPaths);
        setTrees(trees);
      } else {
        throw new Error("Provided string is not a valid array of paths.");
      }
    } catch (error) {
      // Any errors can be logged here
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [pathsString]);

  return { trees, isError, isLoading };
};

export default useTrees;
