import { cn } from '@/utils/cn';
import { FaSearch } from 'react-icons/fa'

type Props = {
    className?: string; // optional additional className props
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}

export default function SearcBox(props: Props) {
  return (
    <form     
        className={cn('flex relative items-center justify-center h-10', props.className)}
        onSubmit={props.onSubmit}
    >
        <input 
        type='text' 
        value={props.value}
        className='w-full border border-gray-100 text-darkGray rounded-l-md pl-3 text-sm py-1 focus:border-slate-300 focus:outline-none' 
        placeholder='Search City' 
        onChange={props.onChange}        
        />

        <button className='text-white text-1xl px-4 rounded-r-md py-1.5 border bg-blue/90  border-blue/85 hover: border-blue hover:bg-blue'
        >
            <FaSearch />
        </button>
  
    </form>
  )
}