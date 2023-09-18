"use client"

import { useDarkMode } from "@/providers/DarkModeProvider"

const ModeToggle: React.FC = () => {
  // 利用 useContext 取得 ThemeContext 的值
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <div className='w-12 h-6 flex items-center justify-between relative p-0.5 rounded-full border-[1.5px] border-emerald-500' onClick={toggleDarkMode}>
      <div className='text-xs'>🌙</div>
      <div className='text-xs'>🔆</div>
      <div
        className='w-4 h-4 bg-emerald-500 absolute rounded-full'
        style={isDarkMode ? { right: "2px" } : { left: "2px" }}
      />
    </div>
  )
}

export default ModeToggle