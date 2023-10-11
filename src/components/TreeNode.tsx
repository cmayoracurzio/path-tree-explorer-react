import { useState } from "react";
import { TreeNodeStructure } from "../types/TreeNodeStructure";

type TreeNodeProps = {
  node: TreeNodeStructure; // Current node data
  expanded?: boolean; // Initial expanded state (optional)
};

/**
 * `TreeNode` - Represents an individual node in a tree structure.
 * Allows interaction to expand or collapse the node to reveal its children.
 *
 * @prop {TreeNodeStructure} node - Data for the current node.
 * @prop {boolean} [expanded=false] - Initial expanded state of the node.
 */
const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  expanded = false,
}: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(expanded);

  return (
    <li role="treeitem" aria-expanded={isExpanded}>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {node.name}{" "}
        {Object.keys(node.children).length > 0 && (isExpanded ? "▼" : "►")}
      </button>

      {/* Render children if node is expanded and has children */}
      {isExpanded && Object.values(node.children).length > 0 && (
        <ul role="group">
          {Object.values(node.children).map((child) => (
            <TreeNode key={child.name} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
