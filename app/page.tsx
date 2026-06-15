import { CustomerForm } from "@/components/customer-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background decorations matching the logo colors (cyan and slate) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-slate-400/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-6xl z-10">
        <CustomerForm />
      </div>
    </div>
  );
}
