"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils";

export default function Page() {
  const { theme, systemTheme } = useTheme()

  const [file1, setFile1] = useState("text\nabc");
  const [file2, setFile2] = useState("test\nabcd");
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [mode, setMode] = useState<'chars' | 'lines' | 'words' | 'sentences'>('chars');

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  const isDark = theme === 'system' ? systemTheme === 'dark' : theme === 'dark';

  let diffMethod: DiffMethod = DiffMethod.CHARS;
  switch (mode) {
    case 'chars':
      diffMethod = DiffMethod.CHARS;
      break;
    case 'lines':
      diffMethod = DiffMethod.LINES;
      break;
    case 'words':
      diffMethod = DiffMethod.WORDS;
      break;
    case 'sentences':
      diffMethod = DiffMethod.SENTENCES;
      break;
  }

  return (
    <div className="h-[100svh] flex flex-col">
      <div className="p-4 space-y-6">
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
              <BreadcrumbPage>Text Diff</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-row space-x-4 items-center justify-between max-w-lg">
          <h1 className="font-bold">
            Diff two files
          </h1>

          <div className="flex flex-row">
            <label>Mode: </label>
            <select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)}>
              <option value="chars">Chars</option>
              <option value="lines">Lines</option>
              <option value="words">Words</option>
              <option value="sentences">Sentences</option>
            </select>
          </div>
        </div>
      </div>

      <main className={cn("relative flex-1 font-mono", isFirstRender && "opacity-0")}>
        <ReactDiffViewer
          oldValue={file1}
          newValue={file2}
          splitView={true}
          useDarkTheme={isDark}
          compareMethod={diffMethod}
          styles={{
            diffContainer: {
              width: '100%',
            },
            wordDiff: {
              padding: 0
            },
          }}
          renderContent={source => <pre className="font-mono">{source}</pre>}
        />
        <textarea 
          value={file1} onChange={(e) => setFile1(e.target.value)} 
          className="absolute top-0 left-0 w-1/2 h-full bg-transparent text-transparent focus:bg-card focus:text-foreground leading-[27px] hover:ring border-r"
          style={{
            paddingLeft: `calc(2ch + 61px)`,
          }}
        />
        <textarea 
          value={file2} onChange={(e) => setFile2(e.target.value)} 
          className="absolute top-0 right-0 w-1/2 h-full bg-transparent text-transparent focus:bg-card focus:text-foreground leading-[27px] hover:ring"
          style={{
            paddingLeft: `calc(2ch + 61px)`,
          }}
        />
      </main>
    </div>
  )
}
