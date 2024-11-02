"use client";

import React from "react";
import { isActive, type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
} from "lucide-react";
import styled from "styled-components";

type Props = {
  editor: Editor | null;
  content: string;
};

const Toolbar = ({ editor, content }: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <Container>
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
        <Item
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
        >
          <Bold style={{ color: editor.isActive("bold") ? '#00264B' : '#d3d3d3' }} />
        </Item>
        <Item
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
        >
          <Italic style={{ color: editor.isActive("italic") ? '#00264B' : '#d3d3d3' }} />
        </Item>
        <Item
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
        >
          <Strikethrough style={{ color: editor.isActive("strike") ? '#00264B' : '#d3d3d3' }} />
        </Item>
        <Item
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
        >
          <Heading2 style={{ color: editor.isActive("heading") ? '#00264B' : '#d3d3d3' }} />
        </Item>

        <Item
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
        >
          <List style={{ color: editor.isActive("bulletList") ? '#00264B' : '#d3d3d3' }} />
        </Item>
        <Item
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
        >
          <ListOrdered style={{ color: editor.isActive("orderedList") ? '#00264B' : '#d3d3d3' }} />
        </Item>
        <Item
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
        >
          <Quote style={{ color: editor.isActive("blockquote") ? '#00264B' : '#d3d3d3' }} />
        </Item>
        <Item
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
        >
          <Code style={{ color: editor.isActive("code") ? '#00264B' : '#d3d3d3' }} />
        </Item>
        <Item
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
        >
          <Undo style={{ color: editor.isActive("undo") ? '#00264B' : '#d3d3d3' }} />
        </Item>
        <Item
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
        >
          <Redo style={{ color: editor.isActive("redo") ? '#00264B' : '#d3d3d3' }} />
        </Item>
      </div>
    </Container>
  )
};


export default Toolbar;

const Container = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 4px 11px;
  min-height: 32px;
  line-height: 1.5715;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  outline: none;
  background-color: #fff;
  transition: border-color 0.3s;
  margin-bottom: 4px;

`

const Item = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
}
`
