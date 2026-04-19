'use client';

import { CheckCircle2, Loader2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  BUDGET_OPTIONS,
  BUDGET_REQUIRED_TYPES,
  PROJECT_TYPES,
  ProjectTypeId,
} from '../../constants';
import { useContactStore } from '../../stores';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const { isContactOpen, setContactOpen } = useContactStore();
  const [status, setStatus] = useState<Status>('idle');
  const [projectType, setProjectType] = useState<ProjectTypeId>('brand-content');
  const [budget, setBudget] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');

  const showBudget = BUDGET_REQUIRED_TYPES.includes(projectType);

  useEffect(() => {
    if (!isContactOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setContactOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isContactOpen, setContactOpen]);

  if (!isContactOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: (formData.get('name') as string) || '',
      phone: (formData.get('phone') as string) || '',
      email: formData.get('email') as string,
      website: formData.get('website') as string,
      projectType,
      projectTypeLabel:
        PROJECT_TYPES.find((p) => p.id === projectType)?.label ?? projectType,
      budget: showBudget ? budget : '',
      budgetLabel: showBudget
        ? BUDGET_OPTIONS.find((b) => b.value === budget)?.label ?? ''
        : '',
      goal: (formData.get('goal') as string) || '',
      deadline,
      deadlineLabel: deadline ? new Date(deadline).toLocaleDateString('es-ES') : '',
      comments: (formData.get('comments') as string) || '',
      source: 'web-contact-form',
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
      setTimeout(() => {
        setContactOpen(false);
        setStatus('idle');
      }, 8000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div
      onClick={() => setContactOpen(false)}
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 backdrop-blur-md p-4 pt-12 pb-12 overflow-y-auto"
      style={{ fontFamily: 'var(--font-vercetti), sans-serif' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl my-auto"
      >
        <Card className="relative border-border/60 bg-card/95 shadow-2xl mt-4 sm:mt-8 mb-8">
          <button
            type="button"
            onClick={() => setContactOpen(false)}
            aria-label="Cerrar"
            className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors z-10"
          >
            <X className="h-4 w-4" />
          </button>
          <CardContent className="p-4 sm:p-5">
            <h2
              className="text-2xl font-semibold tracking-tight text-foreground"
              style={{ fontFamily: 'var(--font-soria), serif' }}
            >
              Cuéntanos sobre tu proyecto
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Nuestro equipo (y un agente de IA) revisará tu brief para preparar una propuesta alineada con tus objetivos.
            </p>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="h-14 w-14 text-green-500 mb-4" />
                <h3 className="text-2xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-soria), serif' }}>
                  ¡Gracias por tu mensaje!
                </h3>
                <p className="mt-3 text-sm text-muted-foreground max-w-md">
                  Tu solicitud se ha enviado con éxito. <strong>Te contactaremos en breve</strong> para hablar sobre tu proyecto.
                </p>
                <div className="mt-5 p-4 bg-muted/50 rounded-lg border border-border max-w-sm">
                  <p className="text-sm text-foreground font-medium">
                    ⚠️ Importante: revisa tu carpeta de correo no deseado (Spam).
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    A veces nuestros correos de confirmación terminan ahí. Por favor, asegúrate de revisar y marcar nuestro correo como seguro.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name" className="font-medium text-sm">
                      Nombre completo
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Ej: Ana García"
                      className="mt-1.5 h-9 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="font-medium text-sm">
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+34 600 000 000"
                      className="mt-1.5 h-9 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-medium text-sm">
                      Email<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="tu@empresa.com"
                      className="mt-1.5 h-9 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website" className="font-medium text-sm">
                      Web o LinkedIn<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      type="text"
                      required
                      placeholder="www.tuempresa.com o enlace"
                      className="mt-1.5 h-9 text-sm"
                    />
                  </div>
                </div>

                <Separator className="my-3" />

                <div>
                  <Label className="font-semibold text-sm text-foreground block mb-2">
                    Tipo de proyecto<span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={projectType}
                    onValueChange={(v) => setProjectType(v as ProjectTypeId)}
                    className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                  >
                    {PROJECT_TYPES.map((opt) => (
                      <label
                        key={opt.id}
                        htmlFor={opt.id}
                        className={`relative flex items-start gap-3 rounded-md border p-3 cursor-pointer transition hover:bg-accent/40 ${
                          projectType === opt.id
                            ? 'border-primary/40 ring-1 ring-primary/30 bg-accent/30'
                            : 'border-input'
                        }`}
                      >
                        <RadioGroupItem
                          value={opt.id}
                          id={opt.id}
                          className="mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium leading-none text-foreground">
                            {opt.label}
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                            {opt.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {showBudget && (
                    <div>
                      <Label htmlFor="budget" className="font-medium text-sm">
                        Presupuesto estimado
                      </Label>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {BUDGET_OPTIONS.map((b) => (
                          <button
                            key={b.value}
                            type="button"
                            onClick={() => setBudget(b.value)}
                            className={`px-2.5 py-1 rounded-md text-xs transition-colors border ${
                              budget === b.value
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-muted/50 text-muted-foreground border-transparent hover:bg-muted'
                            }`}
                          >
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={!showBudget ? "col-span-full" : ""}>
                    <Label htmlFor="deadline" className="font-medium text-sm">
                      Deadline
                    </Label>
                    <Input
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="mt-1.5 cursor-pointer w-full h-9 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="goal" className="font-medium text-sm">
                      Objetivo del proyecto<span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="goal"
                      name="goal"
                      required
                      placeholder="Ej: generar leads, branding..."
                      className="mt-1.5 h-16 min-h-[4rem] text-sm resize-none"
                    />
                  </div>
                  <div>
                    <Label htmlFor="comments" className="font-medium text-sm">
                      Comentarios adicionales
                    </Label>
                    <Textarea
                      id="comments"
                      name="comments"
                      placeholder="¿Hay algo más que debamos saber?"
                      className="mt-1.5 h-16 min-h-[4rem] text-sm resize-none"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <p className="mt-4 text-sm text-destructive">
                    Hubo un error al enviar. Por favor, inténtalo de nuevo.
                  </p>
                )}

                <Separator className="my-4" />

                <div className="flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setContactOpen(false)}
                    disabled={status === 'loading'}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      'Enviar brief'
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
