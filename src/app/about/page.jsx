"use client";

import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.009 10.125 11.927v-8.437H7.078v-3.49h3.047V9.41c0-3.017 1.792-4.686 4.533-4.686 1.312 0 2.686.235 2.686.235v2.961h-1.514c-1.491 0-1.956.929-1.956 1.881v2.258h3.328l-.532 3.49h-2.796V24C19.612 23.082 24 18.092 24 12.073z" />
  </svg>
);

export default function AboutPage() {
  const pathname = usePathname();
  const isStandalone = pathname === "/about";

  const experiences = [
    {
      title: " Frontend Web Developer",
      company: "Personal Projects & Open Source",
      year: "2025 - Present",
    },
    {
      title: "Mern Stack Web Developer",
      company: "Personal Projects & Open Source",
      year: "2025",
    },
    {
      title: "UI/UX Learner & Designer",
      company: "Personal Projects & Open Source",
      year: "2025",
    },
  ];

  return (
    <>
      {isStandalone && (
        <>
          <Header />
          <ThemeToggle />
        </>
      )}

      <main className={`px-4 md:px-8 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300
        ${isStandalone
          ? "pt-28 pb-16 min-h-screen"
          : "py-16 border-t border-slate-200/40 dark:border-slate-800/40"
        }`}
      >
        <div className="max-w-5xl mx-auto space-y-8">

          <header
            className="text-center space-y-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              About Me
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed px-4 max-w-xl mx-auto">
              I’m a CSE student &  Marnt Stack  Web Developer passionate about building modern, responsive, and scalable web applications.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            <div
              className="lg:col-span-1 opacity-0 animate-fade-in-up lg:sticky lg:top-28"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              <section className="card-gradient glow-border rounded-3xl p-6 flex flex-col items-center text-center space-y-6">
                <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-2 border-blue-500/30 transition-transform duration-500 hover:scale-105">
                  <img
                    alt="Shimul Profile"
                    className="w-full h-full object-cover"
                    src="/assest/shimul.png"
                  />
                </div>

                <div className="space-y-4 w-full">
                  <div className="flex justify-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                      Available for opportunities
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold tracking-widest text-slate-900 dark:text-white uppercase">
                      SHIMUL ISLAM
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-[250px] mx-auto">
                      Building seamless experiences across the web with modern, clean, and interactive codebases.
                    </p>
                  </div>

                  <div className="flex justify-center space-x-4">
                    {[
                      { Icon: InstagramIcon, href: "https://www.instagram.com/shimul._02?igsh=MTIwcTNvNXA2dzZiZA==", label: "Instagram" },
                      { Icon: LinkedinIcon, href: "https://www.linkedin.com/in/md-mahafuzur-rahman-shimul-493665406", label: "LinkedIn" },
                      { Icon: GithubIcon, href: "https://github.com/shimul811898", label: "GitHub" },
                      { Icon: FacebookIcon, href: "https://www.facebook.com/shimul.islam.02",label: "Facebook"},
                    ].map(({ Icon, href, label }) => (
                      <a
                        key={label}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-colors text-slate-500 dark:text-slate-400"
                        href={href}
                        aria-label={label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}

                  </div>

                  <a
                    href="mailto:mahafuzur181163@gmail.com"
                    className="w-full block py-3 bg-primary hover:bg-blue-600 text-white rounded-2xl font-medium transition-all transform active:scale-95 shadow-lg shadow-blue-500/10 dark:shadow-none cursor-pointer"
                  >
                    Let's Connect
                  </a>
                </div>
              </section>
            </div>

            <div className="lg:col-span-2 space-y-8">

              <section
                className="card-gradient glow-border rounded-3xl p-6 space-y-4 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Hi! I'm Shimul,
                </h3>
                <div className="space-y-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  <p>
                    I am a passionate Computer Science & Engineering student and   MERN Stack Web Developer focused on building high-quality web applications. I enjoy creating modern UI designs, smooth user experiences, and robust frontend systems.
                  </p>
                  <p>
                    With a focus on clean components, scalable layouts, and collaborative structure, I love turning creative UI/UX designs into pixel-perfect and highly interactive web products.
                  </p>
                </div>
              </section>

              <section
                className="card-gradient glow-border rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  My Tech Stack:
                </h3>
                <div className="flex space-x-3">
                  <div className="tech-stack-icon w-12 h-12 rounded-xl flex items-center justify-center" title="JavaScript">
                    <svg className="w-7 h-7 text-yellow-500 fill-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 3h18v18H3V3zm16.525 13.83c-.072-.387-.454-.635-.954-.635-.402 0-.641.199-.749.441-.186.449-.152.949.038 1.408.15.361.475.583.896.583.434 0 .734-.212.862-.574.062-.182.085-.381.077-.572-.002-.153-.027-.305-.07-.451zm-6.618 1.442c-.01.554.215 1.107.632 1.439.421.336 1.01.447 1.543.29.475-.14.85-.515.99-1.002.043-.146.068-.298.075-.451.008-.184-.012-.367-.061-.544-.122-.44-.458-.781-.884-.91-.184-.055-.38-.073-.574-.051-.316.035-.615.176-.844.394-.229.218-.363.518-.377.835z" />
                    </svg>
                  </div>
                  <div className="tech-stack-icon w-12 h-12 rounded-xl flex items-center justify-center" title="Express.js">
                    <svg className="w-8 h-8 text-slate-800 dark:text-slate-200" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.233 14.914c.2.378.524.673.978.673.477 0 .802-.34.834-.793h1.75c-.035 1.402-1.085 2.344-2.584 2.344-1.48 0-2.518-1.043-2.564-2.65h5.163c.038-1.607-1.118-2.65-2.617-2.65-1.474 0-2.49 1.103-2.49 2.65 0 1.623 1.04 2.65 2.53 2.65zm-.843-3.14h1.748c-.035-.48-.31-.793-.794-.793-.457 0-.773.3-.954.793zM2.853 14.018c0-.77-.525-1.15-1.394-1.15h-.8v2.3h.8c.87 0 1.394-.38 1.394-1.15zm-.853-2.777c0-.623-.424-.962-1.14-.962h-.795v1.923h.794c.717 0 1.14-.339 1.14-.961zm1.753 1.627c0 .69-.356 1.2-.98 1.442l1.1 2.05H2.871l-.946-1.89h-.615v1.89h-.89v-4.945h1.58c1.077 0 1.667.502 1.667 1.257l.086.196z" />
                    </svg>
                  </div>
                  <div className="tech-stack-icon w-12 h-12 rounded-xl flex items-center justify-center" title="Tailwind CSS">
                    <svg className="w-7 h-7 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 6.5c-2.3 0-3.9 1.2-4.8 3.5 1-.3 1.8-.1 2.3.6.4.5.7 1.1 1.1 1.7.6.9 1.4 2 3.2 2 2.3 0 3.9-1.2 4.8-3.5-1 .3-1.8.1-2.3-.6-.4-.5-.7-1.1-1.1-1.7-.6-.9-1.4-2-3.2-2zM5.5 13c-2.3 0-3.9 1.2-4.8 3.5 1-.3 1.8-.1 2.3.6.4.5.7 1.1 1.1 1.7.6.9 1.4 2 3.2 2 2.3 0 3.9-1.2 4.8-3.5-1 .3-1.8.1-2.3-.6-.4-.5-.7-1.1-1.1-1.7-.6-.9-1.4-2-3.2-2z" />
                    </svg>
                  </div>
                  <div className="tech-stack-icon w-12 h-12 rounded-xl flex items-center justify-center" title="React / Next.js">
                    <svg className="w-7 h-7 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.5 12c0-1.2-.6-2.2-1.6-2.9 1-1.1 1.4-2.5 1.1-3.9-.3-1.4-1.3-2.5-2.7-2.9-1.4-.4-2.8 0-3.9 1-.7-1-1.7-1.6-2.9-1.6s-2.2.6-2.9 1.6c-1.1-1-2.5-1.4-3.9-1-1.4.3-2.5 1.3-2.9 2.7-.4 1.4 0 2.8 1 3.9-1 .7-1.6 1.7-1.6 2.9s.6 2.2 1.6 2.9c-1 1.1-1.4 2.5-1.1 3.9.3 1.4 1.3 2.5 2.7 2.9 1.4.4 2.8 0 3.9-1 .7 1 1.7 1.6 2.9 1.6s2.2-.6 2.9-1.6c1.1 1 2.5 1.4 3.9 1 1.4-.3 2.5-1.3 2.9-2.7.4-1.4 0-2.8-1-3.9 1-.7 1.6-1.7 1.6-2.9zm-10.5 3.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" />
                    </svg>
                  </div>
                  <div className="tech-stack-icon w-12 h-12 rounded-xl flex items-center justify-center" title="NodeJS / MongoDB">
                    <svg className="w-7 h-7 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm6.5 14.2l-6.5 3.8-6.5-3.8V7.8l6.5-3.8 6.5 3.8v8.4z" />
                    </svg>
                  </div>
                </div>
              </section>

              <section
                className="card-gradient glow-border rounded-3xl p-6 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                  Experience
                </h3>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {experiences.map((exp, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-4 group transition-colors duration-200"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">
                          {exp.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
                        {exp.year}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>

        </div>
      </main>
    </>
  );
}