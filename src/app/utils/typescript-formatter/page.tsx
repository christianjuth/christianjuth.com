"use client"

import { useRef, useState } from "react"
import CodeEditor from '@uiw/react-textarea-code-editor';
import * as prettier from 'prettier/standalone'
import * as estree from 'prettier/plugins/estree.js'
import * as typescript from 'prettier/plugins/typescript.js'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

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
  const versionRef = useRef(0)

  function format(config?: { semicolons: string, indentation: number }) {
    versionRef.current++;
    const thisVersion = versionRef.current;
    prettier.format(typeScript, {
      parser: 'typescript',
      plugins: [estree, typescript],
      tabWidth: config?.indentation ?? indentation,
      semi: (config?.semicolons ?? semicolons) === 'all' ? true : false
    })
    .then((formatted) => {
      if (versionRef.current > thisVersion) return;
      setTypeScript(formatted)
      setHasError(false)
    })
    .catch(() => {
      if (versionRef.current > thisVersion) return;
      setHasError(true)
    })
  };

  return (
    <div className="max-w-2xl mx-auto h-[100svh] py-10 flex flex-col space-y-3 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Utils</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-row space-x-2 items-center mb-2">
        <h1 className="font-bold flex-1">
          Format TypeScript on blur 
        </h1>

        <div className="flex flex-row">
          <label>Semicolons: </label>
          <select 
            value={semicolons}
            onChange={e => {
              const newSemi = e.target.value
              setSemicolons(newSemi)
              format({
                semicolons: newSemi,
                indentation
              })
            }} 
            className="bg-transparent text-muted-foreground"
          >
            <option value="required">Required</option>
            <option value="all">All</option>
          </select>
        </div>

        <div className="flex flex-row">
          <label>Indentation: </label>
          <select 
            value={indentation}
            onChange={e => {
              const newIndent = +e.target.value
              setIndentation(newIndent)
              format({
                semicolons,
                indentation: newIndent
              })
            }} 
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
          onBlur={() => format()}
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
