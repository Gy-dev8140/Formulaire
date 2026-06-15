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
    <div className="w-full max-w-2xl mx-auto overflow-hidden bg-white dark:bg-zinc-900 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border border-zinc-100 dark:border-zinc-800 transition-all">
      {/* Header with Logo */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-2xl p-2 mb-4 shadow-lg flex items-center justify-center">
            {/* The user will place the logo.png in public folder */}
            <img src="/logo.png" alt="IT BUSINESS Logo" className="w-full h-full object-contain" onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMGIzNzg2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTIyIDEyaC00bC0zIDlsLTQtMThMMCAxMmgtNCIvPjwvc3ZnPg==';
            }} />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">IT BUSINESS</h2>
          <p className="text-blue-200 mt-2 font-medium">Demande d'Intervention Technique</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
        {/* Informations Personnelles */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-bold">1</span>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Vos informations</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="nom" className="text-slate-600 dark:text-slate-400">Nom complet</Label>
              <Input id="nom" placeholder="Jean Dupont" {...register("nom")} className={`bg-slate-50 dark:bg-slate-800/50 ${errors.nom ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 focus-visible:ring-blue-500"}`} />
              {errors.nom && <p className="text-red-500 text-xs font-medium">{errors.nom.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-600 dark:text-slate-400">Adresse Email</Label>
              <Input id="email" type="email" placeholder="jean@exemple.com" {...register("email")} className={`bg-slate-50 dark:bg-slate-800/50 ${errors.email ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 focus-visible:ring-blue-500"}`} />
              {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="localisation" className="text-slate-600 dark:text-slate-400">Localisation (Ville, Quartier)</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input id="localisation" placeholder="Lomé, Nyékonakpoè..." className={`pl-9 bg-slate-50 dark:bg-slate-800/50 ${errors.localisation ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 focus-visible:ring-blue-500"}`} {...register("localisation")} />
            </div>
            {errors.localisation && <p className="text-red-500 text-xs font-medium">{errors.localisation.message}</p>}
          </div>
        </div>

        {/* Détails de la machine */}
        <div className="space-y-5 pt-2">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-bold">2</span>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Détails de la machine</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="type_machine" className="text-slate-600 dark:text-slate-400">Type d'appareil</Label>
              <select 
                id="type_machine"
                {...register("type_machine")}
                className="flex h-9 w-full rounded-md border border-slate-200 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
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
              <Label htmlFor="urgence" className="text-slate-600 dark:text-slate-400">Niveau d'urgence</Label>
              <select 
                id="urgence"
                {...register("urgence")}
                className="flex h-9 w-full rounded-md border border-slate-200 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
              >
                <option value="Faible (Pas pressé)">Faible (Pas pressé)</option>
                <option value="Moyenne (Dans la semaine)">Moyenne (Dans la semaine)</option>
                <option value="Haute (24h - 48h)">Haute (24h - 48h)</option>
                <option value="Critique (Immédiat)">Critique (Immédiat)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nom_machine" className="text-slate-600 dark:text-slate-400">Marque</Label>
              <Input id="nom_machine" placeholder="Ex: HP, Dell, Apple" {...register("nom_machine")} className={`bg-slate-50 dark:bg-slate-800/50 ${errors.nom_machine ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 focus-visible:ring-blue-500"}`} />
              {errors.nom_machine && <p className="text-red-500 text-xs font-medium">{errors.nom_machine.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="modele" className="text-slate-600 dark:text-slate-400">Modèle exact</Label>
              <Input id="modele" placeholder="Ex: EliteBook 840 G5" {...register("modele")} className={`bg-slate-50 dark:bg-slate-800/50 ${errors.modele ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 focus-visible:ring-blue-500"}`} />
              {errors.modele && <p className="text-red-500 text-xs font-medium">{errors.modele.message}</p>}
            </div>
          </div>
        </div>

        {/* Problème */}
        <div className="space-y-5 pt-2">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-bold">3</span>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Description du problème</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="panne" className="text-slate-600 dark:text-slate-400">Expliquez la panne en détail</Label>
            <Textarea 
              id="panne" 
              placeholder="Mon ordinateur ne s'allume plus et fait des bips sonores..." 
              className={`min-h-[120px] bg-slate-50 dark:bg-slate-800/50 ${errors.panne ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 focus-visible:ring-blue-500"}`}
              {...register("panne")} 
            />
            {errors.panne && <p className="text-red-500 text-xs font-medium">{errors.panne.message}</p>}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-14 text-lg font-semibold mt-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-[0_8px_20px_rgba(37,_99,_235,_0.3)] hover:shadow-[0_12px_25px_rgba(37,_99,_235,_0.4)] flex items-center justify-center gap-2 transition-all hover:-translate-y-1"
          disabled={isSubmitting}
        >
          <Send className="w-6 h-6" />
          Envoyer la demande sur WhatsApp
        </Button>
      </form>
    </div>
  );
}
