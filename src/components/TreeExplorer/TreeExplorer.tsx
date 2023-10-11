import styled from "styled-components";
import { useMemo } from "react";
import usePaths from "../../hooks/usePaths";
import { convertPathsToTrees } from "../../lib/utils";
import TreeNode from "../TreeNode/TreeNode";

const Container = styled.div`
  background-color: #f9f9f9;
  border-right: 1px solid #ccc;
  width: 250px;
  height: 100vh;
  overflow-y: auto;
`;

const Content = styled.div`
  padding: 1.5rem;
  font-family: "Inter", sans-serif;
  color: #333;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: bold;
`;

const Message = styled.p`
  font-size: 16px;
  color: #666;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;

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
  const { paths, isError, isLoading } = usePaths();
  const trees = useMemo(() => convertPathsToTrees(paths), [paths]);

  // Determine main content based on state
  let content;
  if (isError) {
    content = (
      <Message role="alert">
        There was an error. Paths could not be loaded.
      </Message>
    );
  } else if (isLoading) {
    content = <Message role="status">Loading...</Message>;
  } else if (paths.length === 0) {
    content = <Message>No paths found.</Message>;
  } else {
    content = (
      <List role="tree" aria-label="Path Tree Explorer">
        {Object.values(trees).map((tree) => (
          <TreeNode key={tree.name} node={tree} />
        ))}
      </List>
    );
  }

  return (
    <Container>
      <Content>
        <Title>Path Tree Explorer:</Title>
        {content}
      </Content>
    </Container>
  );
};

export default TreeExplorer;
