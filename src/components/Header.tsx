"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import Button from "./Button"
import DarkModeToggle from "./ModeToggle"

const Header: React.FC = () => {
  const session = useSession()

  const links = [
    {
      id: 1,
      title: "Portfolio",
      url: "/portfolio",
    },
    {
      id: 2,
      title: "Blog",
      url: "/blog",
    },
    {
      id: 3,
      title: "About",
      url: "/about",
    },
    {
      id: 4,
      title: "Contact",
      url: "/contact",
    },
    {
      id: 5,
      title: "Dashboard",
      url: session.data?.user?.name ? `/dashboard/${session.data.user?.name}` : "/dashboard",
    },
  ]

  return (
    <div className='h-[100px] flex justify-between items-center'>
      <Link href='/' className='font-bold text-2xl'>lamamia</Link>
      <div className='flex items-center gap-5'>
        <DarkModeToggle />
        {links.map((link) => (
          (session.status !== "unauthenticated" || link.id !== 5) && (
            <Link key={link.id} href={link.url}>
              {link.title}
            </Link>
          )
        ))}
        {
          session.status === "authenticated" ?
            <Button text="Logout" url="#" isFull={false} onClick={signOut} />
            :
            <Button text="Login" url="/dashboard/login" isFull={false} />
        }
      </div>
    </div >
  )
}

export default Header