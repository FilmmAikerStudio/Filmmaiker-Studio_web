# FilmmAiker Studio 3D — Portfolio Web

Portfolio web inmersivo 3D de la agencia FilmmAiker Studio. La experiencia completa es una escena Three.js navegable via scroll, con portales que llevan a secciones de "Proyectos" y "Servicios/Trabajo".

## Stack

- **Framework**: Next.js 15 (App Router) + React
- **3D/WebGL**: `@react-three/fiber` (R3F) + `@react-three/drei` + Three.js
- **Animaciones**: GSAP (timelines, `gsap.to`, damping via `THREE.MathUtils`)
- **Estado global**: Zustand (4 stores en `app/stores/`)
- **Responsive**: `react-device-detect` (`isMobile`) para bifurcar lógica desktop/mobile
- **Tipografías 3D**: Soria (`./soria-font.ttf`) para títulos, Vercetti (`./Vercetti-Regular.woff`) para subtítulos
- **Deploy**: VPS via PM2 + Traefik (HTTP/HTTPS)

## Comandos

```bash
npm run dev       # Desarrollo local
npm run build     # Build de producción (verifica TypeScript + ESLint)
npm run start     # Sirve el build
npm run lint      # Linting
```

## Arquitectura de Componentes

```
app/
├── page.tsx                    # Entrada: monta <Canvas> principal (R3F)
├── layout.tsx                  # Root layout + metadatos OG
├── stores/                     # Zustand stores globales
│   ├── portalStore.ts          # activePortalId: 'work' | 'projects' | null
│   ├── scrollStore.ts          # scrollProgress: 0–1
│   ├── themeStore.ts           # theme: light/dark (persiste en localStorage)
│   └── contactStore.ts         # isContactOpen: boolean
├── constants/
│   ├── projects.ts             # PROJECTS[] — datos del carrusel de proyectos
│   ├── work.ts                 # WORK_TIMELINE[] — 5 puntos de la timeline
│   └── footer.ts               # Links de footer (LinkedIn, web, contacto)
├── types/
│   ├── projects.ts             # interface Project { title, date, subtext, url? }
│   └── work.ts                 # interface WorkTimelinePoint
└── components/
    ├── hero/                   # Sección inicial (título animado, scroll CTA)
    ├── footer/                 # Footer con links y toggle de tema
    ├── common/                 # UI reutilizable (ContactForm, GradientMenu, ComplianceBanner, VideoModal)
    ├── models/                 # Componentes de modelos 3D (.glb)
    │   ├── Wanderer.tsx        # wanderer_above_the_sea_of_fog.glb → fondo de Proyectos
    │   ├── Memory.tsx          # dalithe_persistence_of_memory.glb → fondo de Servicios
    │   ├── WindowModel.tsx     # window.glb → animado por scroll
    │   ├── Cloud.tsx           # Nubes procedurales (2 mobile / 6+ desktop)
    │   └── Stars.tsx           # Estrellas procedurales (solo tema dark)
    └── experience/             # SECCIÓN 3D PRINCIPAL
        ├── index.tsx           # Experience: título "EXPERIENCIA" + 2 GridTiles
        ├── GridTile.tsx        # Portal container con MeshPortalMaterial
        ├── Triangle.tsx        # Geometría triangular para mobile
        ├── projects/           # Portal "PROYECTOS"
        │   ├── index.tsx       # Camera setup + Wanderer + ProjectsCarousel
        │   ├── ProjectsCarousel.tsx  # Distribuye tiles en arco circular (FOV=π, dist=13)
        │   ├── ProjectTile.tsx       # Tarjeta individual con GSAP hover/tap
        │   └── TouchPanControls.tsx  # Gestos táctiles mobile (maxRotation=75°)
        └── work/               # Portal "SERVICIOS"
            ├── index.tsx       # Camera setup + Memory model
            └── Timeline.tsx    # Curva Catmull-Rom 3D con 5 puntos, animada por scroll
```

## Flujo de Portales (lógica clave)

```
portalStore.activePortalId
  null          → Vista general: 2 tiles (SERVICIOS y PROYECTOS) visibles
  "projects"    → Entra portal Proyectos, cámara anima a { y:-39, x:2 } (desktop)
                  o { z:11.5, y:-39, x:1 } (mobile)
  "work"        → Entra portal Servicios, habilita scroll vertical (2 páginas)
```

- **Entrar** al portal: click/tap en `GridTile` → `MeshPortalMaterial` blend 0→1 + GSAP cámara
- **Salir**: tecla `Escape` o botón `.close` (div overlay GSAP animado)
- **Exit resets**: `camera.position.x = 0`, `camera.rotation { x: -PI/2, y: 0 }`

## Posiciones 3D Clave

- Escena `<Experience>`: posición `[0, -41.5, 12]`, rotación `[-PI/2, 0, -PI/2]`
- GridTile PROYECTOS: `[2, 0, 0]` (desktop) / `[1, 0, 0]` (mobile)
- GridTile SERVICIOS: `[-2, 0, 0]` (desktop) / `[-1, 0, 0.4]` (mobile)
- Wanderer (backdrop Proyectos): `position=[0, -1, -20]`, `scale=[3.5, 3.5, 3.5]` — detrás de todos los tiles
- Carrusel de tiles: arco de π radianes, distancia 13 unidades, rotación grupo `[0, -PI/12, 0]`
- Cámara en portal Proyectos (desktop): `z=11.5`, rotación Y sigue `pointer.x`

## Añadir un Proyecto con URL

Editar `app/constants/projects.ts`. La URL solo aparece si es válida (no `#`):
```typescript
{
  title: 'Nombre del proyecto',
  date: 'Mes AAAA',
  subtext: 'Descripción corta del proyecto.',
  url: 'https://...',  // Opcional. Sin url → no muestra botón VIEW
}
```

## Configuración de Entorno

El formulario de contacto requiere:
```
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-webhook-n8n.com/...
```
Archivo de referencia de workflow n8n: `Filmmaiker_Studio_Contact_Form_N8N.json`

## Assets

```
public/
├── models/
│   ├── wanderer_above_the_sea_of_fog.glb   (2.1 MB — backdrop Proyectos)
│   ├── dalithe_persistence_of_memory.glb   (293 KB — backdrop Servicios)
│   └── window.glb                          (38 KB — animado por scroll en Hero)
├── soria-font.ttf          (títulos 3D)
└── Vercetti-Regular.woff   (subtítulos 3D)
```

## Notas de Desarrollo

- **No mockear nada del scroll**: `useScroll()` de drei depende del `<ScrollControls>` montado en Canvas. Fuera de ese contexto no funciona.
- **fillOpacity en GSAP**: `@react-three/drei` `<Text>` expone `fillOpacity` como propiedad mutable directa — GSAP puede animarla.
- **isMobile**: booleano estático de `react-device-detect`, no cambia en runtime. Evitar en dependency arrays de `useEffect` (genera warning sin causa).
- **MeshPortalMaterial en mobile**: la geometría triangular define la forma visual del portal pero NO hace clipping de la escena 3D interior.
- **`buttonGroupRef` en ProjectTile**: el botón VIEW se accede por ref explícita, no por índice de `children[]`, para evitar crash si `project.url` no existe.

## Formulario de contacto + CRM

### Variables de entorno requeridas (`.env.local`)

```
NOTION_TOKEN=ntn_xxx              # Internal integration token (notion.so/my-integrations)
NOTION_DATABASE_ID=xxx            # ID de la DB "FilmmAiker Leads" en Notion
N8N_ENRICH_WEBHOOK_URL=https://admin.n8n.filmmaikerstudio.com/webhook/filmmaiker-contact-enrich
```

### Arquitectura híbrida
- `POST /api/contact` → escribe directamente a Notion API (respuesta rápida al usuario)  
- Dispara `N8N_ENRICH_WEBHOOK_URL` en fire-and-forget para enriquecimiento IA

### Propiedades requeridas en la Notion database
| Propiedad | Tipo |
|---|---|
| Name | title |
| Email | email |
| Phone | phone_number |
| Website | url |
| ProjectType | select |
| Budget | select |
| Goal | rich_text |
| Deadline | rich_text |
| Comments | rich_text |
| Status | select (default "Nuevo") |
| Source | select |
| AISummary | rich_text |
| Sector | select |
| LeadScore | number |
| Priority | select |
| SuggestedService | select |
| AIReasoning | rich_text |

### Workflow n8n
Importar `Filmmaiker_Studio_Contact_Form_N8N.json` en n8n → configurar credenciales (Notion, OpenAI, Gmail) → activar → copiar URL del webhook → pegar en `N8N_ENRICH_WEBHOOK_URL`.

### Detalles del Workflow / UI Formulario
- El campo "Website" (`Web o LinkedIn`) es de tipo texto libre (`type="text"`) para aceptar direcciones sin *protocolo* (`http://`) y urls de LinkedIn limpias.
- El modal usa soporte de scroll robusto via flexbox (`items-start pt-12 pb-12` junto con `my-auto` en el frame interno) para evitar fallos de recorte (clipping horizontal) y scroll en dispositivos pequeños de formato móvil cuando la UI general se abarrota.

### Shadcn setup
- Primitives en `app/components/ui/` (button, card, input, label, textarea, select, radio-group, separator, badge)
- Helper `cn()` en `app/lib/utils.ts`
- CSS vars shadcn en `globals.css` (`:root` + `.dark`)
- Sync clase `.dark` via `ThemeSync.tsx` (cliente) enlazado a `useThemeStore`
