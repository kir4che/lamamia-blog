import Link from "next/link"

interface ButtonProps {
  text: string
  url: string
  isFull?: boolean
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ text, url, isFull, onClick }) => {
  return (
    <Link href={url}>
      <button className={`bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-medium ${isFull === true ? "w-full py-3 rounded-md " : "py-1.5 px-4 rounded-full"}`} onClick={onClick}>
        {text}
      </button>
    </Link>
  )
}

export default Button