import type { TreeNodeStructure } from "../types/TreeNodeStructure";

/**
 * Converts a list of paths to a tree structure.
 *
 * Given a list of paths, this function constructs a hierarchical tree structure.
 * Each path is split based on the `/` delimiter, and every unique part
 * of the path is represented as a node in the tree. The resulting tree
 * structures are returned as an object where keys are node names and
 * values are the corresponding tree node structures.
 *
 * Note: The root ("/") is implicit and not included in the output.
 *
 * @param {string[]} paths - An array of string paths.
 * @returns {Record<string, TreeNodeStructure>} An object containing the tree structures.
 *
 * @example
 * const paths = ["/a/b", "/a/c"];
 * const trees = convertPathsToTrees(paths);
 * console.log(trees); // Output: { a: { name: 'a', children: { b: {...}, c: {...} } } }
 */
export const convertPathsToTrees = (
  paths: string[]
): Record<string, TreeNodeStructure> => {
  const root: TreeNodeStructure = { name: "/", children: {} };

  for (const path of paths) {
    // Split each path into its parts (and filter out empty parts)
    const parts = path.split("/").filter(Boolean);

    let node = root;

    for (const part of parts) {
      // Add each part as a child if it doesn't exist in tree yet
      if (!node.children[part]) {
        node.children[part] = { name: part, children: {} };
      }
      node = node.children[part];
    }
  }

  // Return the children of the root (not the root itself)
  return root.children;
};
