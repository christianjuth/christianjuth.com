import Link from 'next/link';

function InternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="underline text-primary">
      {children}
    </Link>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline text-primary">
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <div className="py-10 px-4">
      <main className="max-w-xl mx-auto space-y-5">
        <h1 className="font-bold text-2xl">Christian Juth</h1>

        <section>
          <h2 className="font-bold text-lg">Links</h2>

          <ul className="list-disc list-inside">
            <li>
              <ExternalLink href="https://github.com/christianjuth">
                GitHub
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://www.linkedin.com/in/christian--j">
                LinkedIn
              </ExternalLink>
            </li>
          </ul>

        </section>

        <section>
          <h2 className="font-bold text-lg">Projects</h2>

          <ul className="list-disc list-inside">
            <li>
              <ExternalLink href="https://blue.christianjuth.com">
                BlueSky social media client written in Next.js
              </ExternalLink>
            </li> 
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-lg">Coding Utilities</h2>

          <ul className="list-disc list-inside">
            <li>
              <InternalLink href="/utils/json-formatter">
                JSON Formatter
              </InternalLink>
            </li>
            <li>
              <InternalLink href="/utils/typescript-formatter">
                TypeScript Formatter
              </InternalLink>
            </li>
          </ul>

        </section>

      </main>
    </div>
  );
}
