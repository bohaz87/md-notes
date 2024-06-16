import React, { useEffect, useRef } from "react";
import "cherry-markdown/dist/cherry-markdown.css";
import Cherry from "cherry-markdown";
import { UIStore } from "../../mobx/uiStore";
import { NoteStore } from "../../mobx/noteStore";
import { observer } from "mobx-react-lite";

export const Editor = observer(function Editor({
  uiStore,
  noteStore,
}: {
  uiStore: UIStore;
  noteStore: NoteStore;
}) {
  const editor = useRef<Cherry | null>();

  useEffect(() => {
    if (!editor.current) {
      const cherryInstance = new Cherry({
        id: "markdown-container",
        event: {
          afterChange: (text) => {
            noteStore.save(uiStore.noteId, text);
          },
        },
      });
      editor.current = cherryInstance;
    }
  }, []);

  useEffect(() => {
    let currentNote = noteStore.notes.find((n) => n.id === uiStore.noteId);
    if (editor.current && currentNote!) {
      // editor.current.setMarkdown(currentNote.content);
      editor.current.setValue(currentNote.content);
    }
  }, [noteStore.notes, uiStore.noteId]);

  return <div id="markdown-container"></div>;
});
