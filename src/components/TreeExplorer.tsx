import { useMemo } from "react";
import { convertPathsToTrees } from "../lib/utils";
import TreeNode from "./TreeNode";
import usePaths from "../hooks/usePaths";

/**
 * `TreeExplorer` - A React component that fetches paths, converts them into a tree structure,
 * and renders the tree interactively. It also handles different states like loading, errors,
 * and the scenario when no paths are found.
 *
 * The component relies on the `usePaths` hook to fetch path data and on the `convertPathsToTrees`
 * utility function to transform flat path data into a structured tree form.
 *
 */
const TreeExplorer: React.FC = () => {
  // Use the custom hook to get paths, loading state, and error state
  const { paths, isError, isLoading } = usePaths();

  // Convert paths to tree structures for rendering; use memoization for performance optimization
  const trees = useMemo(() => convertPathsToTrees(paths), [paths]);

  // Determine main content based on state
  let content;
  if (isError) {
    content = <p role="alert">Error: Paths could not be loaded.</p>;
  } else if (isLoading) {
    content = <p role="status">Loading...</p>;
  } else if (paths.length === 0) {
    content = <p>No paths found.</p>;
  } else {
    content = (
      <ul role="tree" aria-label="Path Tree Explorer">
        {Object.values(trees).map((tree) => (
          <TreeNode key={tree.name} node={tree} />
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h1>Path Tree Explorer:</h1>
      {JSON.stringify(trees)}
      {content}
    </div>
  );
};

export default TreeExplorer;
