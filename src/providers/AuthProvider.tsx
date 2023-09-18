"use client"

import { SessionProvider } from "next-auth/react"

// 若直接於 layout.tsx 寫上 <SessionProvider> 會報錯: React Context is unavailable in Server Components
// 在 Server Component 中是無法使用 React Context
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider