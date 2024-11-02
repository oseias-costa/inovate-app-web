'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Dispatch, SetStateAction, useState } from 'react'
import Toolbar from './ToolbarEditor'
import styled from 'styled-components'

const Tiptap = ({ setText, text }: { setText: Dispatch<SetStateAction<string>>, text?: string }) => {
  const [state, setState] = useState(text ?? '')
  const [isFocused, setIsFocused] = useState(false) // Track focus state

  const editor = useEditor({
    extensions: [StarterKit],
    content: text ?? '',
    onUpdate: ({ editor }) => {
      setText(editor.getHTML())
      setState(editor.getHTML())
    }
  })

  return (
    <div>
      <Toolbar editor={editor} content={state} />
      <Container>
        <EditorContent
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            border: `1px solid ${isFocused ? '#40a9ff' : '#d9d9d9'}`,
            boxShadow: isFocused ? '0 0 0 2px rgba(24, 144, 255, 0.2)' : 'none',
            borderRadius: '4px',
            padding: '11px 25px',
            minHeight: '32px',
            lineHeight: '1.5715',
            fontSize: '14px',
            color: 'rgba(0, 0, 0, 0.85)',
            outline: 'none',
            backgroundColor: '#fff',
            transition: 'border-color 0.3s, box-shadow 0.3s'
          }}
          editor={editor}
        />
      </Container>
    </div>
  )
}

export default Tiptap

const Container = styled.div`
  .ProseMirror-focused{

    &:focus {
      outline: none;
    }
  }
} 
`
