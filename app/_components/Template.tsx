import Navbar from '@app/_components/Navbar';
import Sidebar from '@app/_components/Sidebar';
import Footer from '@app/_components/Footer';


export default function TemplateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex relative">      
      <Sidebar />      
      
      <main className="w-full">
        <Navbar />
        <>{children}</>        
        <Footer />
      </main>
    </div>    
  )
}
