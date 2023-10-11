import styled from "styled-components";
import { useState } from "react";
import TreeExplorer from "./components/TreeExplorer/TreeExplorer";

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  font-family: "Inter", sans-serif;
  color: #333;
`;

const Sidebar = styled.div`
  background-color: #f9f9f9;
  border-right: 1px solid #ccc;
  width: 250px;
  height: 100%;
  overflow-y: auto;
`;

const Textarea = styled.textarea`
  flex: 1;

  padding: 1rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  border: none;
  resize: none;

  &:focus {
    outline: none;
  }
`;

const App = () => {
  const [textareaValue, setTextareaValue] = useState<string>(
    '["/root/test", "/dev/null", "/root/something/somewhere"]'
  );

  return (
    <AppContainer>
      <Sidebar>
        <TreeExplorer pathsString={textareaValue} />
      </Sidebar>
      <Textarea
        placeholder="Enter an array of strings here..."
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
      />
    </AppContainer>
  );
};

export default App;
