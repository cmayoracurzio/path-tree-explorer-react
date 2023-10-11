/**
 * Represents the structure of a node in a tree.
 *
 * Each node has a `name` which is a string representation of that node.
 * The `children` property is a record that maps child node names to their corresponding node structures.
 *
 * This type can be recursively nested to represent deep tree structures.
 *
 * @example
 * const node: TreeNodeStructure = {
 *   name: 'root',
 *   children: {
 *     child1: {
 *       name: 'child1',
 *       children: {}
 *     }
 *   }
 * };
 */
export type TreeNodeStructure = {
  name: string;
  children: Record<string, TreeNodeStructure>;
};
