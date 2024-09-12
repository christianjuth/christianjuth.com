"use client"

import { useEffect, useState } from "react"
import CodeEditor from '@uiw/react-textarea-code-editor';

const DEFAUTL_JSON = `{
  "name": "John Doe",
  "age": 30,
  "cars": {
    "car1": "Ford",
    "car2": "BMW",
    "car3": "Fiat"
  }
}`

export default function Page() {
  const [json, setJson] = useState(DEFAUTL_JSON)
  const [hasError, setHasError] = useState(false)
  const [indentation, setIndentation] = useState(2)

  useEffect(() => {
    try {
      const data = JSON.parse(json)
      setJson(JSON.stringify(data, null, indentation))
      setHasError(false)
    } catch (error) {
      setHasError(true)
    } 
  }, [json, indentation])

  return (
    <div className="max-w-2xl mx-auto h-[100svh] py-10 flex flex-col">
      <div className="flex flex-row justify-between items-center mb-2">
        <h1 className="font-bold">
          Auto format JSON as you type
        </h1>

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
          value={json}
          onChange={e => setJson(e.target.value)}
          className="bg-gray-800 rounded-md h-full"
          language="json"
          padding={20}
          style={{
            fontSize: '0.9rem'
          }}
        />
        {hasError && (
          <div className="absolute bottom-2 right-2 bg-destructive text-destructive-foreground py-1 px-2 rounded-md text-sm">
            Invalid JSON
          </div>
        )}
      </div>
    </div>
  )
}
