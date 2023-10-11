import styled from "styled-components";
import { useState } from "react";
import { TreeNodeStructure } from "../types/TreeNodeStructure";

const ListItem = styled.li`
  list-style: none;
  margin: 8px 0;
`;

const NodeName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  display: inline-block;
`;

const ToggleButton = styled.button`
  max-width: 100%;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #333;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    text-decoration: none;
    color: #226ce0;
  }
`;

const ChildrenList = styled.ul`
  padding-left: 20px;
  border-left: 1px dashed #ccc;
`;

type TreeNodeProps = {
  node: TreeNodeStructure;
  expanded?: boolean;
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
  const childrenArray = Object.values(node.children);

  return (
    <ListItem role="treeitem" aria-expanded={isExpanded}>
      {/* Toggle button with node name and expanded/collapsed indicator */}
      <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
        <NodeName>{node.name}</NodeName>
        {childrenArray.length > 0 && (isExpanded ? "▾" : "▸")}
      </ToggleButton>

      {/* Render children if node is expanded and has children */}
      {isExpanded && Object.values(node.children).length > 0 && (
        <ChildrenList role="group">
          {childrenArray.map((child) => (
            <TreeNode key={child.name} node={child} />
          ))}
        </ChildrenList>
      )}
    </ListItem>
  );
};

export default TreeNode;
