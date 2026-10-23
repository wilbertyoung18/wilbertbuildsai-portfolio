/** Your logo mark. Both theme versions are in the DOM; CSS shows the one that matches. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      <img className="only-light" src="/images/brand/Wilbert Builds AI dark Logo.png" alt="" width={96} height={96} fetchPriority="high" />
      <img className="only-dark" src="/images/brand/Wilbert Builds AI white logo.png" alt="" width={96} height={96} fetchPriority="high" />
    </span>
  )
}
