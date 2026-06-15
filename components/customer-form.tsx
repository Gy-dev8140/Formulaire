"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Wrench, MapPin, Monitor, Smartphone, Printer, Server, AlertTriangle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  localisation: z.string().min(2, "Veuillez préciser votre localisation"),
  type_machine: z.string().min(1, "Veuillez sélectionner un type"),
  nom_machine: z.string().min(1, "Veuillez préciser la marque/nom"),
  modele: z.string().min(1, "Veuillez préciser le modèle"),
  panne: z.string().min(10, "Décrivez la panne plus en détail (min 10 caractères)"),
  urgence: z.string().min(1, "Veuillez sélectionner le niveau d'urgence"),
});

type FormValues = z.infer<typeof formSchema>;

export function CustomerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type_machine: "Ordinateur Portable",
      urgence: "Moyenne",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Format message for WhatsApp
    const message = `*🔧 NOUVELLE DEMANDE DE RÉPARATION*\n\n` +
      `👤 *Client:* ${data.nom}\n` +
      `📧 *Email:* ${data.email}\n` +
      `📍 *Localisation:* ${data.localisation}\n\n` +
      `💻 *DÉTAILS DE LA MACHINE*\n` +
      `- Type: ${data.type_machine}\n` +
      `- Marque/Nom: ${data.nom_machine}\n` +
      `- Modèle: ${data.modele}\n\n` +
      `⚠️ *PROBLÈME RENCONTRÉ*\n${data.panne}\n\n` +
      `🚨 *Urgence:* ${data.urgence}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "22897458140"; // Updated to Togo code +228
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden bg-white rounded-[2.5rem] shadow-[0_20px_80px_-15px_rgba(0,0,0,0.15)] border border-slate-200/60 flex flex-col lg:flex-row transition-all duration-500 hover:shadow-[0_20px_80px_-15px_rgba(0,0,0,0.2)]">
      
      {/* Left Pane - Branding & Welcome */}
      <div className="lg:w-[45%] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-10 lg:p-16 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Glowing atmospheric orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-[80px] -translate-y-1/3 translate-x-1/3 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/15 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 animate-pulse" style={{ animationDuration: '6s' }} />
        
        <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Logo Container with premium styling */}
          <div className="relative group mb-10">
            <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-[2rem] group-hover:bg-cyan-400/30 transition-all duration-500"></div>
            <div className="relative w-36 h-36 bg-white rounded-[2rem] p-5 shadow-2xl flex items-center justify-center border border-white/20 transform group-hover:-translate-y-2 transition-all duration-500">
              <img src="/logo.jpeg" alt="IT BUSINESS Logo" className="w-full h-full object-contain" onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMGIzNzg2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIyIDEyaC00bC0zIDlsLTQtMThMMCAxMmgtNCIvPjwvc3ZnPg==';
              }} />
            </div>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight mb-6">
            Bonjour<span className="text-cyan-400">.</span>
          </h2>
          
          <div className="w-12 h-1.5 bg-cyan-500 rounded-full mb-6"></div>
          
          <p className="text-slate-300 text-lg lg:text-xl leading-relaxed font-light">
            Votre matériel informatique rencontre un problème ?<br/><br/>
            Détaillez votre souci via ce formulaire sécurisé. Notre équipe d'experts prendra le relais immédiatement.
          </p>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="lg:w-[55%] p-8 lg:p-16 bg-[#FAFAFA] relative">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 relative z-10">
          
          {/* Informations Personnelles */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white text-cyan-600 font-bold text-sm shadow-[0_4px_10px_rgba(0,0,0,0.05)] border border-slate-100">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">Vos informations</h3>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <Label htmlFor="nom" className="text-slate-600 font-semibold text-sm ml-1">Nom complet</Label>
                <Input id="nom" placeholder="Jean Dupont" {...register("nom")} className={`bg-white hover:bg-slate-50/50 border-slate-200 text-slate-800 focus-visible:ring-4 focus-visible:ring-cyan-500/10 focus-visible:border-cyan-500 placeholder:text-slate-300 rounded-2xl h-14 shadow-sm transition-all duration-300 ${errors.nom ? "border-red-300 ring-1 ring-red-200" : ""}`} />
                {errors.nom && <p className="text-red-500 text-sm font-medium ml-1">{errors.nom.message}</p>}
              </div>

              <div className="space-y-2 group">
                <Label htmlFor="email" className="text-slate-600 font-semibold text-sm ml-1">Adresse Email</Label>
                <Input id="email" type="email" placeholder="jean@exemple.com" {...register("email")} className={`bg-white hover:bg-slate-50/50 border-slate-200 text-slate-800 focus-visible:ring-4 focus-visible:ring-cyan-500/10 focus-visible:border-cyan-500 placeholder:text-slate-300 rounded-2xl h-14 shadow-sm transition-all duration-300 ${errors.email ? "border-red-300 ring-1 ring-red-200" : ""}`} />
                {errors.email && <p className="text-red-500 text-sm font-medium ml-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-2 group">
              <Label htmlFor="localisation" className="text-slate-600 font-semibold text-sm ml-1">Localisation (Ville, Quartier)</Label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 h-5 w-5 text-slate-300 group-focus-within:text-cyan-500 transition-colors" />
                <Input id="localisation" placeholder="Lomé, Nyékonakpoè..." className={`pl-12 bg-white hover:bg-slate-50/50 border-slate-200 text-slate-800 focus-visible:ring-4 focus-visible:ring-cyan-500/10 focus-visible:border-cyan-500 placeholder:text-slate-300 rounded-2xl h-14 shadow-sm transition-all duration-300 ${errors.localisation ? "border-red-300 ring-1 ring-red-200" : ""}`} {...register("localisation")} />
              </div>
              {errors.localisation && <p className="text-red-500 text-sm font-medium ml-1">{errors.localisation.message}</p>}
            </div>
          </div>

          {/* Détails de la machine */}
          <div className="space-y-6 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white text-cyan-600 font-bold text-sm shadow-[0_4px_10px_rgba(0,0,0,0.05)] border border-slate-100">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">Détails de la machine</h3>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type_machine" className="text-slate-600 font-semibold text-sm ml-1">Type d'appareil</Label>
                <select 
                  id="type_machine"
                  {...register("type_machine")}
                  className="flex h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 py-1 text-slate-800 shadow-sm transition-all duration-300 hover:bg-slate-50/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/10 focus-visible:border-cyan-500 appearance-none cursor-pointer"
                >
                  <option value="Ordinateur Portable">Ordinateur Portable</option>
                  <option value="Ordinateur de Bureau">Ordinateur de Bureau</option>
                  <option value="Imprimante">Imprimante</option>
                  <option value="Serveur">Serveur</option>
                  <option value="Tablette / Smartphone">Tablette / Smartphone</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgence" className="text-slate-600 font-semibold text-sm ml-1">Niveau d'urgence</Label>
                <select 
                  id="urgence"
                  {...register("urgence")}
                  className="flex h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 py-1 text-slate-800 shadow-sm transition-all duration-300 hover:bg-slate-50/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/10 focus-visible:border-cyan-500 appearance-none cursor-pointer"
                >
                  <option value="Faible (Pas pressé)">Faible (Pas pressé)</option>
                  <option value="Moyenne (Dans la semaine)">Moyenne (Dans la semaine)</option>
                  <option value="Haute (24h - 48h)">Haute (24h - 48h)</option>
                  <option value="Critique (Immédiat)">Critique (Immédiat)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nom_machine" className="text-slate-600 font-semibold text-sm ml-1">Marque</Label>
                <Input id="nom_machine" placeholder="Ex: HP, Dell, Apple" {...register("nom_machine")} className={`bg-white hover:bg-slate-50/50 border-slate-200 text-slate-800 focus-visible:ring-4 focus-visible:ring-cyan-500/10 focus-visible:border-cyan-500 placeholder:text-slate-300 rounded-2xl h-14 shadow-sm transition-all duration-300 ${errors.nom_machine ? "border-red-300 ring-1 ring-red-200" : ""}`} />
                {errors.nom_machine && <p className="text-red-500 text-sm font-medium ml-1">{errors.nom_machine.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="modele" className="text-slate-600 font-semibold text-sm ml-1">Modèle exact</Label>
                <Input id="modele" placeholder="Ex: EliteBook 840 G5" {...register("modele")} className={`bg-white hover:bg-slate-50/50 border-slate-200 text-slate-800 focus-visible:ring-4 focus-visible:ring-cyan-500/10 focus-visible:border-cyan-500 placeholder:text-slate-300 rounded-2xl h-14 shadow-sm transition-all duration-300 ${errors.modele ? "border-red-300 ring-1 ring-red-200" : ""}`} />
                {errors.modele && <p className="text-red-500 text-sm font-medium ml-1">{errors.modele.message}</p>}
              </div>
            </div>
          </div>

          {/* Problème */}
          <div className="space-y-6 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white text-cyan-600 font-bold text-sm shadow-[0_4px_10px_rgba(0,0,0,0.05)] border border-slate-100">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">Description du problème</h3>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="panne" className="text-slate-600 font-semibold text-sm ml-1">Expliquez la panne en détail</Label>
              <Textarea 
                id="panne" 
                placeholder="Décrivez précisément les symptômes que vous rencontrez..." 
                className={`min-h-[140px] bg-white hover:bg-slate-50/50 border-slate-200 text-slate-800 focus-visible:ring-4 focus-visible:ring-cyan-500/10 focus-visible:border-cyan-500 placeholder:text-slate-300 rounded-2xl px-5 py-4 shadow-sm resize-none transition-all duration-300 ${errors.panne ? "border-red-300 ring-1 ring-red-200" : ""}`}
                {...register("panne")} 
              />
              {errors.panne && <p className="text-red-500 text-sm font-medium ml-1">{errors.panne.message}</p>}
            </div>
          </div>

          <Button 
            type="submit" 
            className="group w-full h-16 text-lg font-bold mt-10 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl shadow-[0_8px_20px_rgba(15,_23,_42,_0.2)] hover:shadow-[0_15px_30px_rgba(15,_23,_42,_0.3)] flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1"
            disabled={isSubmitting}
          >
            <span>Envoyer la demande</span>
            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-cyan-400" />
          </Button>
        </form>
      </div>
    </div>
  );
}
