import Footer from "@/components/Footer"
import Header from "@/components/Header"
import AuthProvider from "@/providers/AuthProvider"
import { DarkModeProvider } from "@/providers/DarkModeProvider"
import '@/styles/globals.css'
import { AppProps } from "next/app"

function App({ Component, pageProps }: AppProps) {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <div className="container space-y-6">
          <Header />
          <Component {...pageProps}></Component>
          <Footer />
        </div>
      </AuthProvider>
    </DarkModeProvider>
  )
}



export default App
