"use client"

import { useEffect, useState } from "react"
import CodeEditor from '@uiw/react-textarea-code-editor';
import * as prettier from 'prettier/standalone'
import * as estree from 'prettier/plugins/estree.js'
import * as typescript from 'prettier/plugins/typescript.js'

const DEFAULT_TYPESCRIPT = 
`function add(a: number, b: number) {
  return a + b;
}
`

export default function Page() {
  const [typeScript, setTypeScript] = useState(DEFAULT_TYPESCRIPT)
  const [indentation, setIndentation] = useState(2)
  const [semicolons, setSemicolons] = useState("all")
  const [hasError, setHasError] = useState(false)

  const handleBlur = async () => {
    try {
      const formatted = await prettier.format(typeScript, {
        parser: 'typescript',
        plugins: [estree, typescript],
        tabWidth: indentation,
        semi: semicolons === 'all' ? true : false
      })
      setTypeScript(formatted)
      setHasError(false)
    } catch (error) {
      setHasError(true)
    } 
  }

  useEffect(() => {
    handleBlur()
  }, [indentation, semicolons]);

  return (
    <div className="max-w-2xl mx-auto h-[100svh] py-10 flex flex-col">
      <div className="flex flex-row justify-between items-center mb-2">
        <h1 className="font-bold">
          Auto format TypeScript on blur 
        </h1>

        <div className="flex flex-row">
          <label>Semicolons: </label>
          <select 
            value={semicolons}
            onChange={e => setSemicolons(e.target.value)} 
            className="bg-transparent text-muted-foreground"
          >
            <option value="required-only">Required only</option>
            <option value="all">All</option>
          </select>
        </div>

        <div className="flex flex-row">
          <label>Indentation: </label>
          <select 
            value={indentation}
            onChange={e => setIndentation(+e.target.value)} 
            className="bg-transparent text-muted-foreground"
          >
            <option value="2">2 spaces</option>
            <option value="4">4 spaces</option>
          </select>
        </div>
      </div>

      <div className="font-mono relative flex-1">
        <CodeEditor 
          value={typeScript}
          onChange={e => setTypeScript(e.target.value)}
          className="bg-gray-800 rounded-md h-full"
          language="typescript"
          padding={20}
          style={{
            fontSize: '0.9rem'
          }}
          onBlur={handleBlur}
        />
        {hasError && (
          <div className="absolute bottom-2 right-2 bg-destructive text-destructive-foreground py-1 px-2 rounded-md text-sm">
            Invalid TypeScript
          </div>
        )}
      </div>
    </div>
  )
}
