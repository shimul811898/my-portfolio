import FloatingTechIcon from "./FloatingTechIcon";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
  const techIcons = [
    {
      name: "VS Code",
      svg: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.9 6.5l-2.7-2.4c-.2-.2-.6-.2-.8 0L12 11.3l-3.4-3-5-4.4c-.3-.2-.7-.2-.9 0L.1 5.3c-.2.2-.2.5 0 .7l5 4.4-5 4.4c-.2.2-.2.5 0 .7l2.6 1.4c.2.2.6.2.9 0l5-4.4 3.4 3 8.4 7.2c.2.2.6.2.8 0l2.7-2.4c.2-.2.2-.5 0-.7L16.4 12l7.5-4.8c.2-.2.2-.5 0-.7z" fill="#007ACC"/>
        </svg>
      ),
      positionClasses: "top-[42%] left-[5%] lg:left-[-5%]",
      delay: "0s",
    },
    {
      name: "Next.js",
      svg: (
        <svg className="w-7 h-7" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="90" cy="90" r="90" fill="black"/>
          <path d="M149.508 157.52L69.142 54H54v72h12.162V71.843l67.582 89.261a90.004 90.004 0 0015.764-3.584z" fill="url(#paint0_linear)"/>
          <rect x="115" y="54" width="13" height="72" fill="url(#paint1_linear)"/>
          <defs>
            <linearGradient id="paint0_linear" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint1_linear" x1="121" y1="54" x2="121" y2="126" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      ),
      positionClasses: "top-[18%] left-[18%]",
      delay: "0.5s",
    },
    {
      name: "React.js",
      svg: (
        <svg className="w-7 h-7" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="8" fill="#61DAFB"/>
          <ellipse cx="50" cy="50" rx="40" ry="16" fill="none" stroke="#61DAFB" strokeWidth="2.5" transform="rotate(0 50 50)"/>
          <ellipse cx="50" cy="50" rx="40" ry="16" fill="none" stroke="#61DAFB" strokeWidth="2.5" transform="rotate(60 50 50)"/>
          <ellipse cx="50" cy="50" rx="40" ry="16" fill="none" stroke="#61DAFB" strokeWidth="2.5" transform="rotate(120 50 50)"/>
        </svg>
      ),
      positionClasses: "top-[38%] right-[5%] lg:right-[-5%]",
      delay: "1.2s",
    },
    {
      name: "Tailwind CSS",
      svg: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6.086C14.4 3.686 18.6 3.686 21 6.086c2.4 2.4 2.4 6.6 0 9-1.2 1.2-2.8 1.8-4.5 1.8h-4.5V12.386c0-1.7-.6-3.3-1.8-4.5l1.8-1.8z" fill="#06B6D4"/>
          <path d="M12 17.914c-2.4 2.4-6.6 2.4-9 0-2.4-2.4-2.4-6.6 0-9 1.2-1.2 2.8-1.8 4.5-1.8h4.5v4.5c0 1.7.6 3.3 1.8 4.5l-1.8 1.8z" fill="#38BDF8"/>
        </svg>
      ),
      positionClasses: "top-[15%] right-[12%]",
      delay: "1.8s",
    },
    {
      name: "MongoDB",
      svg: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1.5c-.3 0-.6.2-.7.4C10.1 4.5 7 11.4 7 14.5c0 2.8 2.2 5 5 5s5-2.2 5-5c0-3.1-3.1-10-4.3-12.6-.1-.2-.4-.4-.7-.4zm0 2.2c.7 1.8 3.1 7.7 3.1 10.8 0 1.7-1.4 3.1-3.1 3.1s-3.1-1.4-3.1-3.1c0-3.1 2.4-9 3.1-10.8z" fill="#47A248"/>
          <path d="M12 19.5v3c0 .3.2.5.5.5s.5-.2.5-.5v-3h-1z" fill="#47A248"/>
        </svg>
      ),
      positionClasses: "bottom-[20%] left-[40%]",
      delay: "2.2s",
    },
    {
      name: "HTML5",
      svg: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm16.5 6H7.1l.3 3h10.3l-.4 4.5-3.8 1.2-3.8-1.2-.2-2.5H6.5l.4 5.5 5.1 1.6 5.1-1.6.8-9V6z" fill="#E34F26"/>
        </svg>
      ),
      positionClasses: "top-[65%] left-[10%]",
      delay: "0.8s",
    },
    {
      name: "CSS3",
      svg: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm16.4 6H6.9l.2 3h9.8l-.3 3.4-3.6 1.2-3.6-1.2-.2-2.1H6.3l.3 5.1 4.4 1.4 4.4-1.4.7-7.4H17.9z" fill="#1572B6"/>
        </svg>
      ),
      positionClasses: "top-[60%] right-[8%]",
      delay: "1.5s",
    }
  ];

  return (
    <main className="relative min-h-screen pt-24 lg:pt-20 flex items-center bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-500">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/10 dark:bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-400/10 dark:bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        <div className="space-y-8 max-w-xl lg:col-span-7 order-last lg:order-first text-center lg:text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm shadow-sm">
              <span>Hello Mate</span>
              <span className="animate-bounce inline-block">👋</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-900 dark:text-white">
              I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">MAHAFUZUR RAHMAN SHIMUL</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 text-slate-700 dark:text-slate-300">
                A MERN Stack Web Developer
              </span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            CSE Student & Full-Stack Developer focused on building modern, responsive, and high-performance web applications with clean UI and smooth UX.
          </p>

          <div className="flex flex-col sm:flex-row mb-8 items-center justify-center lg:justify-start gap-4 pt-2 ">
            <a 
              href="mailto:mahafuzur181163@gmail.com?subject=Hi Shimul, Let's Connect!&body=Hello Shimul,"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-blue-500/20 dark:shadow-none hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group text-center"
            >
              Contact Me
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            
            <a 
              href="/Md_Mahafuzur_Rahman_Shimul_Resume.pdf"
              download="Md_Mahafuzur_Rahman_Shimul_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto  border border-slate-200 dark:border-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-900/80 text-slate-700 dark:text-slate-300 font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-2.5 transition-all backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
            >
              Download Resume
              <Download className="w-4 h-4 " />
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center items-center relative min-h-[440px] sm:min-h-[520px] lg:min-h-[620px]">
          
          <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full border border-slate-200/60 dark:border-slate-800/50 bg-gradient-to-tr from-slate-100/20 to-white/10 dark:from-slate-900/20 dark:to-slate-800/10 backdrop-blur-[2px] shadow-inner" />

          <div className="absolute inset-0 z-20 pointer-events-none">
            {techIcons.map((icon) => (
              <FloatingTechIcon
                key={icon.name}
                positionClasses={icon.positionClasses}
                delay={icon.delay}
                containerClass="pointer-events-auto p-2.5 rounded-xl bg-white dark:bg-slate-900 shadow-md border border-slate-100 dark:border-slate-800 flex flex-col items-center group relative cursor-pointer"
              >
                {icon.svg}

                <span className="absolute bottom-full mb-2 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 ease-out px-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-slate-100 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-md shadow-lg whitespace-nowrap z-50">
                  {icon.name}
                </span>
              </FloatingTechIcon>
            ))}

            <FloatingTechIcon
              positionClasses="top-[32%] right-[28%]"
              delay="2.4s"
              containerClass="p-2.5 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-500 rounded-md shadow-sm" />
            </FloatingTechIcon>
          </div>

          <div className="relative w-[260px] h-[340px] sm:w-[340px] sm:h-[440px] lg:w-[360px] lg:h-[480px] flex items-end justify-center rounded-3xl overflow-hidden bg-gradient-to-b from-slate-100/40 via-slate-50/20 to-transparent dark:from-slate-900/40 dark:via-slate-950/20 border border-white/20 dark:border-slate-800/30 shadow-2xl z-10">
            <img
              src="/assest/shimul.png"
              alt="Shimul"
              className="rounded-full mb-15 object-contain transition-all duration-500 hover:scale-[1.03]"
            />
          </div>

        </div>

      </div>
    </main>
  );
}