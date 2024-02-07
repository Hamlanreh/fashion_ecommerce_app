import Image from 'next/image';

export default function Loader() {
  return (
    <div className="bg-white/20 absolute top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"> 
        <Image 
            src="/images/icons/spinner_icon.svg" 
            alt="loading" 
            width="200" 
            height="200" 
            className="spinner" 
        />
    </div>
  )
}
