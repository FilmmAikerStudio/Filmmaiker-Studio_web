export type ProjectTypeId =
  | 'brand-content'
  | 'filmmaking'
  | 'automation'
  | 'trainings';

export interface ProjectTypeOption {
  id: ProjectTypeId;
  label: string;
  description: string;
}

export const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: 'brand-content',
    label: 'AI Brand Content',
    description: 'Contenido visual/animado con IA.',
  },
  {
    id: 'filmmaking',
    label: 'AI Filmmaking',
    description: 'Spots híbridos (real + IA).',
  },
  {
    id: 'automation',
    label: 'AI Automation',
    description: 'Agentes y workflows de IA.',
  },
  {
    id: 'trainings',
    label: 'AI Trainings',
    description: 'Formación y consultoría IA.',
  },
];

export const BUDGET_OPTIONS = [
  { value: '0-500', label: '0 – 500 €' },
  { value: '500-1000', label: '500 – 1.000 €' },
  { value: '1000-2000', label: '1.000 – 2.000 €' },
  { value: '2000-5000', label: '2.000 – 5.000 €' },
  { value: '5000-10000', label: '5.000 – 10.000 €' },
];

export const BUDGET_REQUIRED_TYPES: ProjectTypeId[] = [
  'brand-content',
  'filmmaking',
];
