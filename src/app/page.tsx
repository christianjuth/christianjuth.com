import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import Blue from '@/assets/blue.png'
import * as React from 'react';

function Grid({
  children,
  cols = 2,
  className,
}: {
  children: React.ReactNode | React.ReactNode[];
  cols?: 2 | 4;
  className?: string;
}) {
  const childrenArray = React.Children.toArray(children);

  return (
    <ul 
      className={cn(
        "grid md:grid-cols-2 border-dashed",
        cols === 4 && "md:grid-cols-4",
        className
      )}
    >
      {childrenArray.map((child, i) => (
        <li 
          key={i}
          className={cn("hover:bg-accent border-dashed border-b grid", i % cols !== (cols - 1) && "md:border-r")}
        >
          {child}
        </li>
      ))}
    </ul>
  )
}

function InternalLink({ 
  href, 
  children,
  className,
}: { 
  href: string; 
  children: React.ReactNode 
  className?: string;
}) {
  return (
    <Link href={href} className={cn("cursor-pointer", typeof children === "string" && "hover:underline", className)}>
      {children}
    </Link>
  );
}

function ExternalLink({
  href, 
  children,
  className,
}: { 
  href: string; 
  children: React.ReactNode 
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn('cursor-pointer', typeof children === "string" && "hover:underline", className)}>
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto md:border-x border-dashed">

      <header>
        <Grid className="min-h-64">
          <div className="p-6 max-md:pt-12 flex flex-col justify-center">
            <h1 className="font-black text-3xl md:text-5xl">
              <span>Christian Juth.</span><br />
              <span>Frontend Engineer</span>
            </h1>

            <div className="flex flex-row space-x-2 mt-2">
              <ExternalLink href="https://github.com/christianjuth">
                <Badge variant="default">GitHub</Badge>
              </ExternalLink>

              <ExternalLink href="https://www.linkedin.com/in/christian--j">
                <Badge variant="default">LinkedIn</Badge>
              </ExternalLink>
            </div>
          </div>

          <div className="p-6 flex flex-col justify-center">
            <p className="leading-relaxed text-lg">
              Specializing in React and Next.js, focused on building fast, accessible web apps with strong UI design. I excel in optimizing performance, implementing testing strategies, and delivering seamless user experiences.
            </p>
          </div>
        </Grid>
      </header>

      <section>
        <h2 className="font-black text-3xl p-6 py-5 mt-20 border-y border-dashed">
          Projects
        </h2>

        <Grid>
          <ExternalLink className="space-y-2 p-6 relative" href="https://blue.christianjuth.com">

            <h2 className="text-lg relative font-bold mb-3 leading-[1em]">
              BlueSky Social Media Client
            </h2>

            <div className="flex flex-row space-x-2 relative mb-3">
              <Badge variant="outline">Next.js</Badge>
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">Tailwind</Badge>
            </div>

            <div className="w-full aspect-video relative">
              <Image src={Blue} alt="BlueSky Social Media Client" fill unoptimized className="object-top rounded border" />
            </div>
          </ExternalLink>
        </Grid>
      </section>

      <section>
        <h2 className="font-black text-3xl p-6 py-5 mt-20 border-y border-dashed">
          Articles
        </h2>

        <Grid>
          <ExternalLink className="space-y-2 p-6" href="https://dev.to/creedbratton/the-principles-uiux-responsive-and-accessible-design-40hf">
            <h2 className="font-bold">
              The Principles UI/UX – Responsive and Accessible Design
            </h2>

            <div className="flex flex-row space-x-2">
              <Badge variant="outline">Accesability</Badge>
            </div>
          </ExternalLink>

          <ExternalLink className="space-y-2 p-6" href="https://dev.to/creedbratton/turn-your-resume-into-an-interactive-cli-in-10-minutes-with-typescript-25fc">
            <h2 className="font-bold">
              Turn Your Resume Into an Interactive CLI in 10 minutes using TypeScript
            </h2>

            <div className="flex flex-row space-x-2">
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">CLI</Badge>
            </div>
          </ExternalLink>

        </Grid>
      </section>

      <section>
        <h2 className="font-black text-3xl p-6 py-5 mt-20 border-y border-dashed">
          Tools
        </h2>

        <Grid cols={4}>
          <InternalLink href="/utils/json-formatter" className="p-6 block">
            JSON Formatter
          </InternalLink>
          <InternalLink href="/utils/typescript-formatter" className="p-6 block">
            TypeScript Formatter
          </InternalLink>
          <InternalLink href="/utils/text-diff" className="p-6 block">
            Text Diff
          </InternalLink>
        </Grid>
      </section>

    </main>
  );
}
