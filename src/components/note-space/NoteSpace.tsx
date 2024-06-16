import React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { UIStore } from "../../mobx/uiStore";
import { FolderStore } from "../../mobx/folderStore";

const StyledCt = styled.aside`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  cursor: default;
`;

const StyledHeader = styled.header`
  font-size: 0.8rem;
  color: #989aa0;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin: 0.5rem 0;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    padding: 0.5rem 1rem;

    &.selected {
      background-color: #ecc34c;
      color: #fff;
    }
  }
`;

const StyledTotal = styled.span`
  width: 3rem;
  text-align: right;
  color: #9b9da3;
`;

export const NoteSpaces = observer(function NoteSpaces({
  className,
  uiStore,
  folderStore,
}: {
  className?: string;
  uiStore: UIStore;
  folderStore: FolderStore;
}) {
  return (
    <StyledCt className={className}>
      {folderStore.groups.map((group, idx) => {
        return (
          <div key={group.name}>
            <StyledHeader>{group.name}</StyledHeader>
            <StyledList>
              {group.folders.map((folder) => (
                <li
                  key={folder.name}
                  onClick={() => uiStore.selectFolder(folder)}
                  className={uiStore.folderId === folder.id ? "selected" : ""}
                >
                  {folder.name}
                  <StyledTotal>{folder.total}</StyledTotal>
                </li>
              ))}
            </StyledList>
          </div>
        );
      })}
      <div>
        <button
          onClick={() => {
            const name = window.prompt("new folder name");
            folderStore.addNew(String(name));
          }}
        >
          新建文件夹
        </button>
      </div>
    </StyledCt>
  );
});
