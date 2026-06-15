import { CustomerForm } from "@/components/customer-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-500/20 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-40 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-4xl z-10 text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          Centre de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Réparation Express</span>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Votre machine est en panne ? Décrivez-nous le problème ci-dessous et notre équipe vous recontactera immédiatement sur WhatsApp.
        </p>
      </div>

      <div className="w-full z-10">
        <CustomerForm />
      </div>
    </div>
  );
}
