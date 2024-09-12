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

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  const isDark = theme === 'system' ? systemTheme === 'dark' : theme === 'dark';

  return (
    <div className="h-[100svh] font-mono flex flex-col">
      <div className="p-4 space-y-4">
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

        <h1 className="font-bold">
          Diff two files
        </h1>
      </div>

      <main className={cn("relative flex-1", isFirstRender && "opacity-0")}>
        <ReactDiffViewer
          oldValue={file1}
          newValue={file2}
          splitView={true}
          useDarkTheme={isDark}
          compareMethod={DiffMethod.CHARS}
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
