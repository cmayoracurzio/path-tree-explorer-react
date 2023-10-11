import styled from "styled-components";
import useTrees from "../../hooks/useTrees";
import TreeNode from "../TreeNode/TreeNode";

const Container = styled.div`
  padding: 1.5rem;
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
 * `TreeExplorer` - A React component that visualizes paths in an interactive tree structure.
 *
 * Given a string representation of paths, this component parses the paths and then renders
 * the corresponding tree. It manages various states, including loading, errors, and cases
 * where no paths are found.
 *
 * Internally, the component leverages the `useTrees` hook to handle the paths and convert
 * them into tree structures.
 *
 */
const TreeExplorer = ({ pathsString }: { pathsString: string }) => {
  const { trees, isError, isLoading } = useTrees(pathsString);

  // Tree content depends on state
  let content;
  if (isError || !trees) {
    content = (
      <Message role="alert">
        There was an error. Paths could not be loaded.
      </Message>
    );
  } else if (isLoading) {
    content = <Message role="status">Loading...</Message>;
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
      <Title>Path Tree Explorer:</Title>
      {content}
    </Container>
  );
};

export default TreeExplorer;
