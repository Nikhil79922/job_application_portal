import { Loader2 } from "lucide-react"

interface ButtonLoaderProps {
  text?: string
}

const ButtonLoader = ({
  text = "Loading...",
}: ButtonLoaderProps) => {
  return (
    <div className="flex items-center justify-center gap-2">

      <Loader2 className="h-4 w-4 animate-spin" />

      <span>{text}</span>
    </div>
  )
}

export default ButtonLoader