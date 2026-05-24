export default function FloatingTechIcon({
  children,
  src,
  alt,
  positionClasses,
  delay,
  containerClass = "p-3 rounded-xl",
  imgClass = "w-8 h-8",
}) {
  return (
    <div
      className={`absolute z-20 floating ${positionClasses}`}
      style={{ animationDelay: delay }}
    >
      <div className={`bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:scale-110 ${containerClass}`}>
        {src ? (
          <img
            alt={alt}
            src={src}
            className={`${imgClass} object-contain`}
            loading="lazy"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
