
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  spinner: ({ className, ...props }: IconProps) => (
    <Loader className={cn("h-4 w-4 animate-spin", className)} {...props} />
  ),
};
