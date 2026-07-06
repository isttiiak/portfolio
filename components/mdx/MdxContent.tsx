import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ComponentPropsWithoutRef } from "react";

const components = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mb-4 mt-12 font-display text-2xl font-bold tracking-tight text-cream first:mt-0 sm:text-3xl"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mb-3 mt-8 font-display text-xl font-bold text-cream" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-5 text-[15px] leading-relaxed text-stone" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-5 space-y-2 pl-1" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-[15px] leading-relaxed text-stone marker:font-mono marker:text-ember" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="flex gap-3 text-[15px] leading-relaxed text-stone [ol_&]:block" {...props}>
      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ember [ol_&]:hidden" aria-hidden="true" />
      <span className="[ol_&]:contents">{props.children}</span>
    </li>
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-ember underline decoration-ember/40 underline-offset-4 transition-colors hover:text-amber"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-cream" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="rounded bg-char px-1.5 py-0.5 font-mono text-[13px] text-amber" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mb-5 overflow-x-auto rounded-xl border border-line bg-char p-5 font-mono text-[13px] leading-relaxed text-cream [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-cream"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="mb-5 border-l-2 border-ember pl-5 italic text-stone" {...props} />
  ),
  hr: () => <hr className="my-10 border-line" />,
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="mb-5 overflow-x-auto rounded-xl border border-line">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="border-b border-line bg-char font-mono text-xs uppercase tracking-wider text-amber" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => <th className="px-4 py-3 font-medium" {...props} />,
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-t border-line px-4 py-3 text-stone" {...props} />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
    />
  );
}
