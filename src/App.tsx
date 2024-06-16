import React from "react";
import { observer } from "mobx-react-lite";
import { NoteSpaces } from "./components/note-space/NoteSpace";
import styled from "styled-components";
import { NoteList } from "./components/note-list/NoteList";

import { Editor } from "./components/editor/Editor";
import storages from "./storage/index";
import noteStore from "./mobx/noteStore";
import uiStore from "./mobx/uiStore";
import folderStore from "./mobx/folderStore";

folderStore.loadFromStorage(storages);
noteStore.loadFromStorage(storages[0]);
if (noteStore.notes.length) {
  uiStore.selectNote(noteStore.notes[0]);
} else {
  uiStore.selectFolder(folderStore.groups[0].folders[0]);
}

const AppCt = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const StyleNoteSpaces = styled(NoteSpaces)`
  width: 250px;
  background-color: #e5e7eb;
  border-right: 1px solid #ced0d6;
`;

const StyledMain = styled.main`
  flex: 1;
  display: grid;
  grid-template-columns: 400px auto;
  grid-template-rows: 40px auto;
`;

const Menu1 = styled.div`
  background-color: #eaecf2;
  border-right: 1px solid #e6e6e6;
`;

const Menu2 = styled.div`
  background-color: #eaecf2;
`;

const App = observer(function () {
  return (
    <AppCt>
      <StyleNoteSpaces
        uiStore={uiStore}
        folderStore={folderStore}
      ></StyleNoteSpaces>
      <StyledMain>
        <Menu1></Menu1>
        <Menu2>
          <button
            onClick={() => {
              noteStore.addNew();
            }}
          >
            Add new note
          </button>
        </Menu2>
        <NoteList noteStore={noteStore} uiStore={uiStore} />
        <div style={{ overflow: "scroll" }}>
          <Editor uiStore={uiStore} noteStore={noteStore} />
        </div>
      </StyledMain>
    </AppCt>
  );
});

export default App;
