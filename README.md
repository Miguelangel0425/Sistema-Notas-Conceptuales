# Sistema de Gestión de Convocatoria de Notas Conceptuales 2026

Sistema web institucional para administrar el ciclo completo de las **Notas Conceptuales** del Anexo 1 de la Convocatoria 2026, construido **exclusivamente con HTML5, CSS3 y TypeScript** (sin frameworks ni librerías externas, sin backend — todos los datos viven en memoria).

---

## 1. Descripción

La aplicación replica fielmente el formulario institucional `FOR ANEXO 1 DE LA CONVOCATORIA DE NOTAS CONCEPTUALES 2026.docm`, incluyendo sus 7 secciones, sus listas desplegables (fijas y en cascada), sus casillas de verificación, sus tablas dinámicas con cálculo automático, y todas las reglas de negocio y validaciones que en el documento original estaban implementadas mediante macros VBA — aquí reescritas 100% en TypeScript orientado a objetos.

## 2. Objetivos

- Digitalizar el formulario en un sistema web navegable, con Dashboard, CRUD de Convocatorias/Directores/Notas, Consultas y Reportes.
- Reemplazar las macros VBA (`CargarMetasODS`, `CargarCineEspecifico`, `CargarCineDetallado`, `CargarPNDPoliticas`, `CargarOEEstrategias`, y sus funciones auxiliares) por servicios TypeScript equivalentes.
- Aplicar Programación Orientada a Objetos real: encapsulamiento, composición/agregación, interfaces, enums, y separación de responsabilidades (modelo–servicio–validador–controlador–vista).
- Implementar todas las validaciones generales, de fechas y reglas de negocio descritas en el Anexo 1.

## 3. Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica, `index.html` como único punto de montaje |
| CSS3 (Grid, Flexbox, variables CSS) | Diseño institucional responsive, sin frameworks |
| TypeScript 5 (`strict: true`) | Toda la lógica de dominio, servicios, validaciones y renderizado del DOM |
| `tsc` | Único compilador; no se usa Webpack/Vite/bundler |

No se utiliza Angular, React, Vue, Svelte, Bootstrap, Tailwind, jQuery, Node/Express como backend, PHP, ni bases de datos — los datos se mantienen en clases y arreglos en memoria, tal como exige el alcance del proyecto.

## 4. Arquitectura

Arquitectura en capas (Views → Controllers → Services → Models/Validators), con patrones **Singleton** (`SistemaGestion`, `EventBus`), **Observer** (`EventBus` para reactividad sin virtual DOM), **Strategy** (`CascadaSelectService`, un método por cada cascada del Anexo 1) y **Repository** implícito dentro de cada `*Service`. El enrutamiento es un `Router` propio basado en `location.hash`, sin ninguna librería de ruteo.

Ver el detalle completo de arquitectura, diagrama UML textual y justificación de diseño en el historial de esta conversación (Fases 2 y 3 del desarrollo).

## 5. Estructura de carpetas

```
Proyecto/
├── index.html            # único punto de entrada
├── tsconfig.json
├── package.json
├── styles/                # CSS puro, organizado por base/layout/components/views
└── src/
    ├── main.ts            # bootstrap de la aplicación
    ├── enums/             # EstadoNota, EstadoConvocatoria, Cobertura, SectorBeneficiario, TipoImpacto, EstadoFormulario
    ├── interfaces/        # IPersona, IDirector, IPresupuesto, IActividad, INota, IFirma, IView, ICascada
    ├── data/               # catálogos estáticos (sedes, departamentos, ODS, CINE, PND, plan estratégico, líneas, dominios)
    ├── models/             # clases de dominio (NotaConceptual, Convocatoria, Director, Presupuesto, etc.)
    ├── classes/            # EventBus (Observer transversal)
    ├── services/           # lógica de negocio y CRUD en memoria
    ├── validators/         # todas las validaciones generales, de fecha y reglas de negocio
    ├── controllers/        # Router + registro de rutas por módulo
    └── views/              # DOM puro (sin frameworks), organizado por módulo de navegación
```

## 6. Clases principales

`SistemaGestion` (Singleton) · `Convocatoria` · `Director` · `NotaConceptual` · `Departamento` · `Carrera` · `Alineamiento` · `ODS` · `PND` · `GAD` · `ImpactoEsperado` · `PoblacionBeneficiaria` · `Presupuesto` · `ItemPresupuesto` · `EntidadCooperante` · `Cronograma` · `Actividad` · `CalculadoraPresupuesto` · `EventBus`.

## 7. Interfaces

`IPersona` · `IDirector` · `IPresupuesto` · `IActividad` · `INota` · `IView` · `ICascada<T>`.

## 8. Enums

`EstadoNota` (REGISTRADA/EN_REVISION/APROBADA/RECHAZADA) · `EstadoConvocatoria` (ABIERTA/CERRADA/VENCIDA) · `Cobertura` · `SectorBeneficiario` · `TipoImpacto` · `EstadoFormulario`.

## 9. Módulos de navegación

Dashboard · Convocatorias · Directores · Notas Conceptuales (con 6 secciones del Anexo 1 — se retiró la sección de Firmas de responsabilidad por no ser necesaria en el flujo digital) · Consultas (por código/director/nombre/estado/convocatoria) · Reportes.

Cada Nota Conceptual editable muestra un botón **"✔ Registrar nota conceptual"** al final del formulario. Los campos se guardan en memoria al vuelo (blur/change) sección por sección, pero el registro definitivo se confirma explícitamente con este botón, que ejecuta una validación integral (ámbitos prioritarios, presupuesto con al menos un ítem y dentro del límite, jerarquía de población, cronograma con al menos una actividad dentro del período) antes de dar la confirmación de éxito.

> Nota de alcance: Presupuesto y Cronograma **no** son módulos de navegación independientes en el sidebar — se editan como secciones 5 y 6 dentro del detalle de cada Nota Conceptual, tal como aparecen en el documento original.

## 10. Reglas de negocio y validaciones implementadas

- Fechas: inicio de convocatoria ≥ hoy; fin > inicio; nota dentro del período de la convocatoria; actividades dentro del período de la nota.
- Presupuesto: cantidad > 0; valor unitario ≥ 0; total ≤ USD 20 000; recálculo automático en cada alta/baja de ítem.
- Población: objetivo ≤ potencial ≤ referencia.
- Estado: convocatoria vencida no admite notas nuevas; convocatoria cerrada no admite modificaciones; nota aprobada/rechazada no editable; presupuesto solo editable si la nota es editable; cronograma exige al menos una actividad.
- Unicidad: código de nota y nombre de convocatoria no se repiten.
- Formato: correo válido, teléfono válido, campos obligatorios marcados y validados en tiempo real con mensaje debajo del campo.

## 11. Límite de datos honestamente documentado

Las listas "padre" del Anexo 1 (17 ODS, 11 campos CINE amplios, 9 objetivos PND, 4 objetivos estratégicos institucionales, dominios, sedes, departamentos, líneas de investigación) son **datos reales extraídos directamente del `.docm`**. Las listas "hijas" completas de las cascadas ODS→Meta, CINE específico/detallado y PND→Política viven comprimidas dentro del `vbaProject.bin` del documento original y no pudieron descompilarse por falta de acceso a red en el entorno de desarrollo; se completaron con catálogos oficiales públicos (Agenda 2030 ONU, CINE-F 2013 UNESCO, PND Ecuador) — revisar `src/data/*.data.ts` y reemplazar si la institución cuenta con el listado exacto original.

## 12. Cómo ejecutar

### Opción A — Docker Hub / Docker (construir y ejecutar, sin compose)

```bash
# 1. Construir la imagen (desde la raíz del proyecto, donde está el Dockerfile)
docker build -t m3nm4/signc-notas-conceptuales:1.0 .

# 2. Iniciar sesión en Docker Hub (opcional, solo si vas a publicarla)
docker login

# 3. Publicar la imagen (opcional)
docker push m3nm4/signc-notas-conceptuales:1.0

# 4. Ejecutar
docker run -d --name signc -p 8080:80 --restart unless-stopped m3nm4/signc-notas-conceptuales:1.0
```

Abre `http://localhost:8080`.

Comandos útiles:
```bash
docker ps                     # ver que el contenedor está corriendo
docker logs -f signc          # ver logs de nginx
docker stop signc && docker rm signc   # detenerlo y eliminarlo
docker pull m3nm4/signc-notas-conceptuales:1.0   # en otra máquina, solo con la imagen publicada
```

Después de cualquier cambio de código hay que reconstruir la imagen:
```bash
docker build -t m3nm4/signc-notas-conceptuales:1.0 .
docker stop signc && docker rm signc
docker run -d --name signc -p 8080:80 --restart unless-stopped m3nm4/signc-notas-conceptuales:1.0
```

El `Dockerfile` es multi-stage: compila TypeScript con Node 20 en la primera etapa y sirve los archivos estáticos con `nginx:alpine` en la segunda — la imagen final **no contiene Node ni el código fuente**, solo HTML/CSS/JS compilado + nginx. El `nginx.conf` incluido resuelve el hash-routing de la SPA.

### Opción B — Node local (sin Docker)

Requiere Node.js solo para compilar (no hay backend en tiempo de ejecución).

```bash
npm install         # instala TypeScript como devDependency
npm run build        # compila src/ -> dist/ con tsc
npm run serve         # sirve el proyecto estático en http://localhost:8080
```

> ⚠️ **No abras `index.html` con doble clic.** Los navegadores bloquean los módulos ES (`<script type="module">`) bajo el protocolo `file://` por política CORS — siempre debe servirse por HTTP (Docker, `npm run serve`, `python3 -m http.server`, o la extensión Live Server de VS Code).

## 12.1 Datos precargados al iniciar (seed)

`SeedService` (`src/services/SeedService.ts`) se ejecuta una vez al arrancar `main.ts` y garantiza que el sistema nunca inicie completamente vacío:

- **Convocatoria por defecto**: "Convocatoria de Notas Conceptuales 2026", estado ABIERTA, vigente desde hoy por 6 meses — solo se crea si no existe ninguna convocatoria todavía.
- **2 Directores de ejemplo**, uno por cada uno de los dos primeros departamentos del catálogo — solo se crean si no existe ningún director todavía. Esto permite crear una Nota Conceptual de inmediato sin pasos previos.
- **Departamentos**: el catálogo completo de 10 departamentos del Anexo 1 (`src/data/departamentos.data.ts`) ya está precargado por diseño — no es una colección editable en memoria sino un catálogo institucional fijo, igual que Sedes, ODS, CINE y PND, así que aparece completo en todos los `<select>` de departamento sin ningún paso adicional.

Como todo vive en memoria (sin base de datos), este seed se vuelve a ejecutar en cada recarga completa de la página.

## 13. Cómo compilar

```bash
npm run build     # compilación única
npm run watch      # recompila automáticamente en cada cambio
```

El compilador usa `strict: true`, `target: ES2020` y `module: ES2020` con resolución `Bundler`; no requiere ningún bundler para funcionar en el navegador gracias a `<script type="module">`.
