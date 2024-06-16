import React, { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import { observer } from "mobx-react-lite";
import { NoteStore } from "../../mobx/noteStore";
import { UIStore } from "../../mobx/uiStore";

const StyledCt = styled.div`
  border-right: 1px solid #e2e2e2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
`;

const StyledNoteGroup = styled.div`
  margin: 0.5rem;
`;

const StyledGroupHeader = styled.div`
  font-size: 0.8rem;
  color: #989aa0;
  border-bottom: 1px solid #e1e1e1;
  padding: 0.2rem 0.5rem;
`;

const StyledNoteList = styled.div`
  margin: 0.5rem 0;
`;

const NotePreviewInner = styled.div`
  padding: 0.5rem 0;
  border-top: 1px solid #ccc;
`;

const NotePreview = styled.div<{ $selected: boolean }>`
  min-height: 55px; // TODO
  padding: 0 0.5rem 0 1.5rem;
  border-radius: 5px;
  cursor: default;

  ${(props) =>
    props.$selected &&
    css`
      background-color: gainsboro;
      & ${NotePreviewInner} {
        border-top-color: transparent;
      }
      // TODO : how can I get NotePreivew class name, instead of write 'div' here
      & + div ${NotePreviewInner} {
        border-top-color: transparent;
      }
    `}

  &:first-child ${NotePreviewInner} {
    border-top-color: transparent;
  }
`;

const NoteTitle = styled.div`
  font-weight: 700;
`;

const NoteContent = styled.div``;

const ResizeControl = styled.div`
  position: absolute;
  right: -1px;
  top: 0;
  height: 100%;
  width: 3px;
  cursor: col-resize;
`;

export const NoteList = observer(function NoteList({
  className,
  noteStore,
  uiStore,
}: {
  className?: string;
  noteStore: NoteStore;
  uiStore: UIStore;
}) {
  const groups = noteStore.groups;

  return (
    <StyledCt className={className}>
      {groups.map((group: NoteGroup) => (
        <StyledNoteGroup key={group.name}>
          <StyledGroupHeader>{group.name}</StyledGroupHeader>
          <StyledNoteList>
            {group.notes.map((note) => (
              <NotePreview
                key={note.id}
                onClick={() => uiStore.selectNote(note)}
                // className={selected === item.id ? "selected" : ""}
                $selected={uiStore.noteId === note.id}
              >
                <NotePreviewInner>
                  <NoteTitle>{note?.title}</NoteTitle>
                  <NoteContent>{note.content}</NoteContent>
                </NotePreviewInner>
              </NotePreview>
            ))}
          </StyledNoteList>
        </StyledNoteGroup>
      ))}
      <ResizeControl></ResizeControl>
    </StyledCt>
  );
});
