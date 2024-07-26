import { cn } from '@/utils/cn'

type Props = {}
export default function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
        {...props} 
        className={cn('w-full bg-white rounded-xl flex py-4 shadow-sm', props.className)}/>        
  )
}