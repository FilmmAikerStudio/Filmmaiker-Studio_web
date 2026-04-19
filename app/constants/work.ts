import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: 'Fase 1',
    title: 'Descubrimiento',
    subtitle: 'Consultoría Estratégica',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: 'Fase 2',
    title: 'Concepto',
    subtitle: 'Dirección de Arte IA',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: 'Fase 3',
    title: 'Producción IA',
    subtitle: 'Filmmaking + Visuales',
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: 'Fase 4',
    title: 'Automatización',
    subtitle: 'Agentes IA + Workflows',
    position: 'left',
  },
  {
    point: new THREE.Vector3(1, 1, -12),
    year: 'Lanzamiento',
    title: 'Impacto',
    subtitle: 'Entrega + Seguimiento',
    position: 'right',
  },
]
