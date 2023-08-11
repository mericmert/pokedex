import Link from 'next/link'
import Image from 'next/image'

export default function PokedexLogo() {
  return (
    <Link href={"/"}>
        <Image
          src={"/pokedex-logo.png"}
          alt="pokedex-logo"
          width={150}
          height={150}
        />
      </Link>
  )
}
