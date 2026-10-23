import { DiscordLogo, FacebookLogo, GithubLogo, LinkedinLogo, XLogo } from '@phosphor-icons/react'
import type { SocialLink } from '@/content/schema'

/** Glyph for a social link (Phosphor brand icons). Add a network: extend `SocialLink['icon']` in
 *  content/schema.ts, add its case here and its hover colour in social-links.css. */
export function SocialIcon({ icon, size = 20 }: { icon: SocialLink['icon']; size?: number }) {
  switch (icon) {
    case 'facebook':
      return <FacebookLogo size={size} weight="fill" aria-hidden />
    case 'linkedin':
      return <LinkedinLogo size={size} weight="fill" aria-hidden />
    case 'discord':
      return <DiscordLogo size={size} weight="fill" aria-hidden />
    case 'github':
      return <GithubLogo size={size} weight="fill" aria-hidden />
    case 'x':
      return <XLogo size={size} weight="bold" aria-hidden />
    case 'upwork':
      return (
        <img
          src="/images/brand/upwork-icon.png"
          alt=""
          width={size}
          height={size}
          aria-hidden
          style={{ display: 'block' }}
        />
      )
    case 'onlinejobsph':
      return (
        <img
          src="/images/brand/OLJ.png"
          alt=""
          width={size}
          height={size}
          aria-hidden
          style={{ display: 'block' }}
        />
      )
  }
}
