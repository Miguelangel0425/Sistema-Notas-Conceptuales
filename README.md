# Sistema de Gestión de Convocatoria de Notas Conceptuales 2026

Sistema web institucional para administrar el ciclo completo de las **Notas Conceptuales** del Anexo 1 de la Convocatoria 2026, construido **exclusivamente con HTML5, CSS3 y TypeScript** (sin frameworks ni librerías externas, sin backend — todos los datos viven en memoria).

---

## 1. Descripción

La aplicación replica fielmente el formulario institucional `FOR ANEXO 1 DE LA CONVOCATORIA DE NOTAS CONCEPTUALES 2026.docm`, incluyendo sus 7 secciones, sus listas desplegables (fijas y en cascada), sus casillas de verificación, sus tablas dinámicas con cálculo automático, y todas las reglas de negocio y validaciones que en el documento original estaban implementadas mediante macros VBA — aquí reescritas 100% en TypeScript orientado a objetos.

## 2. Objetivos

* Digitalizar el formulario en un sistema web navegable, con Dashboard, CRUD de Convocatorias/Directores/Notas, Consultas y Reportes.
* Reemplazar las macros VBA (`CargarMetasODS`, `CargarCineEspecifico`, `CargarCineDetallado`, `CargarPNDPoliticas`, `CargarOEEstrategias`, y sus funciones auxiliares) por servicios TypeScript equivalentes.
* Aplicar Programación Orientada a Objetos real: encapsulamiento, composición/agregación, interfaces, enums, y separación de responsabilidades (modelo–servicio–validador–controlador–vista).
* Implementar todas las validaciones generales, de fechas y reglas de negocio descritas en el Anexo 1.

## 3. Tecnologías

| Tecnología                          | Uso                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------ |
| HTML5                               | Estructura semántica, `index.html` como único punto de montaje           |
| CSS3 (Grid, Flexbox, variables CSS) | Diseño institucional responsive, sin frameworks                          |
| TypeScript 5 (`strict: true`)       | Toda la lógica de dominio, servicios, validaciones y renderizado del DOM |
| `tsc`                               | Único compilador; no se usa Webpack/Vite/bundler                         |

No se utiliza Angular, React, Vue, Svelte, Bootstrap, Tailwind, jQuery, Node/Express como backend, PHP, ni bases de datos — los datos se mantienen en clases y arreglos en memoria, tal como exige el alcance del proyecto.

## 4. Arquitectura

Arquitectura en capas (Views → Controllers → Services → Models/Validators), con patrones **Singleton** (`SistemaGestion`, `EventBus`), **Observer** (`EventBus` para reactividad sin virtual DOM), **Strategy** (`CascadaSelectService`, un método por cada cascada del Anexo 1) y **Repository** implícito dentro de cada `*Service`.

El enrutamiento es un `Router` propio basado en `location.hash`, sin ninguna librería de ruteo.

## 5. Estructura de carpetas

```
Proyecto/
├── index.html            # único punto de entrada
├── tsconfig.json
├── package.json
├── Dockerfile
├── nginx.conf
├── styles/               # CSS puro, organizado por base/layout/components/views
└── src/
    ├── main.ts           # bootstrap de la aplicación
    ├── enums/            # EstadoNota, EstadoConvocatoria, Cobertura, SectorBeneficiario, TipoImpacto, EstadoFormulario
    ├── interfaces/       # IPersona, IDirector, IPresupuesto, IActividad, INota, IFirma, IView, ICascada
    ├── data/             # catálogos estáticos (sedes, departamentos, ODS, CINE, PND, plan estratégico, líneas, dominios)
    ├── models/           # clases de dominio (NotaConceptual, Convocatoria, Director, Presupuesto, etc.)
    ├── classes/          # EventBus (Observer transversal)
    ├── services/         # lógica de negocio y CRUD en memoria
    ├── validators/       # todas las validaciones generales, de fecha y reglas de negocio
    ├── controllers/      # Router + registro de rutas por módulo
    └── views/            # DOM puro (sin frameworks), organizado por módulo de navegación
```

## 6. Clases principales

`SistemaGestion` (Singleton) · `Convocatoria` · `Director` · `NotaConceptual` · `Departamento` · `Carrera` · `Alineamiento` · `ODS` · `PND` · `GAD` · `ImpactoEsperado` · `PoblacionBeneficiaria` · `Presupuesto` · `ItemPresupuesto` · `EntidadCooperante` · `Cronograma` · `Actividad` · `CalculadoraPresupuesto` · `EventBus`.

## 7. Interfaces

`IPersona` · `IDirector` · `IPresupuesto` · `IActividad` · `INota` · `IView` · `ICascada<T>`.

## 8. Enums

`EstadoNota` (REGISTRADA/EN_REVISION/APROBADA/RECHAZADA) · `EstadoConvocatoria` (ABIERTA/CERRADA/VENCIDA) · `Cobertura` · `SectorBeneficiario` · `TipoImpacto` · `EstadoFormulario`.

## 9. Módulos de navegación

Dashboard · Convocatorias · Directores · Notas Conceptuales (con 6 secciones del Anexo 1 — se retiró la sección de Firmas de responsabilidad por no ser necesaria en el flujo digital) · Consultas (por código/director/nombre/estado/convocatoria) · Reportes.

Cada Nota Conceptual editable muestra un botón **"✔ Registrar nota conceptual"** al final del formulario.

Los campos se guardan en memoria al vuelo (`blur`/`change`) sección por sección, pero el registro definitivo se confirma explícitamente con este botón, que ejecuta una validación integral:

* Ámbitos prioritarios.
* Presupuesto con al menos un ítem.
* Presupuesto dentro del límite permitido.
* Jerarquía de población beneficiaria.
* Cronograma con al menos una actividad.
* Actividades dentro del período establecido.

Solo después de superar todas las validaciones se muestra la confirmación de registro exitoso.

> **Nota de alcance:** Presupuesto y Cronograma **no** son módulos de navegación independientes en el sidebar. Se editan como secciones 5 y 6 dentro del detalle de cada Nota Conceptual, tal como aparecen en el documento original.

## 10. Reglas de negocio y validaciones implementadas

* **Fechas:** inicio de convocatoria ≥ hoy; fin > inicio; nota dentro del período de la convocatoria; actividades dentro del período de la nota.
* **Presupuesto:** cantidad > 0; valor unitario ≥ 0; total ≤ USD 20 000; recálculo automático en cada alta o baja de ítem.
* **Población:** objetivo ≤ potencial ≤ referencia.
* **Estado:** convocatoria vencida no admite notas nuevas; convocatoria cerrada no admite modificaciones; nota aprobada/rechazada no editable; presupuesto solo editable si la nota es editable; cronograma exige al menos una actividad.
* **Unicidad:** código de nota y nombre de convocatoria no se repiten.
* **Formato:** correo válido, teléfono válido, campos obligatorios marcados y validados en tiempo real con mensaje debajo del campo.

## 11. Límite de datos documentado

Las listas "padre" del Anexo 1 —17 ODS, 11 campos CINE amplios, 9 objetivos PND, 4 objetivos estratégicos institucionales, dominios, sedes, departamentos y líneas de investigación— son datos reales extraídos directamente del `.docm`.

Las listas "hijas" completas de las cascadas ODS → Meta, CINE específico/detallado y PND → Política viven comprimidas dentro del `vbaProject.bin` del documento original y no pudieron descompilarse en el entorno de desarrollo.

Por este motivo, se completaron con catálogos oficiales públicos correspondientes a:

* Agenda 2030 de las Naciones Unidas.
* CINE-F 2013 de UNESCO.
* Plan Nacional de Desarrollo del Ecuador.

En el catálogo CINE se incorporaron los campos específicos disponibles para cada campo amplio, incluyendo códigos como `002`, `003`, `102` y `104`.

Se recomienda revisar `src/data/*.data.ts` y reemplazar los catálogos si la institución dispone del listado exacto utilizado en el documento original.

## 12. Cómo ejecutar

### Opción A — Docker Hub / Docker (construir y ejecutar, sin Compose)

```bash
# 1. Construir la imagen desde la raíz del proyecto
docker build -t m3nm4/signc-notas-conceptuales:1.0 .

# 2. Iniciar sesión en Docker Hub
# Opcional, solo si se publicará la imagen
docker login

# 3. Publicar la imagen
# Opcional
docker push m3nm4/signc-notas-conceptuales:1.0

# 4. Ejecutar el contenedor
docker run -d --name signc -p 8080:80 --restart unless-stopped m3nm4/signc-notas-conceptuales:1.0
```

Abre en el navegador:

`http://localhost:8080`

### Comandos útiles de Docker

```bash
# Verificar que el contenedor está ejecutándose
docker ps

# Visualizar los logs de nginx
docker logs -f signc

# Detener y eliminar el contenedor
docker stop signc && docker rm signc

# Descargar la imagen publicada desde otra máquina
docker pull m3nm4/signc-notas-conceptuales:1.0
```

### Reconstruir después de modificar el código

Después de cualquier cambio en el código fuente se debe reconstruir la imagen:

```bash
docker build -t m3nm4/signc-notas-conceptuales:1.0 .

docker stop signc && docker rm signc

docker run -d --name signc -p 8080:80 --restart unless-stopped m3nm4/signc-notas-conceptuales:1.0
```

El `Dockerfile` utiliza una construcción **multi-stage**.

En la primera etapa se compila TypeScript utilizando Node 20. En la segunda etapa, los archivos estáticos generados son servidos mediante `nginx:alpine`.

La imagen final **no contiene Node ni el código fuente TypeScript**. Únicamente contiene:

* HTML.
* CSS.
* JavaScript compilado.
* nginx.

El archivo `nginx.conf` incluido permite resolver correctamente el hash-routing utilizado por la SPA.

### Opción B — Node local (sin Docker)

Node.js se utiliza únicamente para compilar y servir los archivos durante el desarrollo. La aplicación no posee un backend Node.js.

```bash
npm install
npm run build
npm run serve
```

Después, abre:

`http://localhost:8080`

> ⚠️ **No abras `index.html` mediante doble clic.**
>
> Los navegadores bloquean los módulos ES (`<script type="module">`) bajo el protocolo `file://` debido a las políticas CORS.
>
> La aplicación debe servirse mediante HTTP utilizando Docker, `npm run serve`, `python3 -m http.server` o la extensión Live Server de VS Code.

## 12.1 Datos precargados al iniciar (Seed)

`SeedService` (`src/services/SeedService.ts`) se ejecuta una vez durante el arranque de `main.ts` y garantiza que el sistema no inicie completamente vacío.

### Convocatoria por defecto

Se crea automáticamente:

**"Convocatoria de Notas Conceptuales 2026"**

La convocatoria inicia en estado `ABIERTA` y permanece vigente durante seis meses desde la fecha actual.

Solo se crea si no existe ninguna convocatoria registrada.

### Directores de ejemplo

Se crean **2 directores de ejemplo**, correspondientes a los dos primeros departamentos disponibles en el catálogo.

Los directores únicamente se crean cuando no existe ningún director registrado.

Esto permite crear una Nota Conceptual inmediatamente sin necesidad de registrar manualmente datos iniciales.

### Departamentos

El catálogo completo de **10 departamentos del Anexo 1** se encuentra definido en:

`src/data/departamentos.data.ts`

Los departamentos son un catálogo institucional fijo y no constituyen una colección editable en memoria.

El catálogo funciona de la misma manera que:

* Sedes.
* ODS.
* CINE.
* PND.

Por este motivo, los departamentos aparecen automáticamente en todos los elementos `<select>` correspondientes.

Como todos los datos del sistema viven en memoria y no existe una base de datos, el proceso de seed se ejecuta nuevamente después de cada recarga completa de la aplicación.

## 13. Cómo compilar

### Compilación única

```bash
npm run build
```

### Compilación automática durante el desarrollo

```bash
npm run watch
```

El compilador TypeScript utiliza la siguiente configuración principal:

* `strict: true`
* `target: ES2020`
* `module: ES2020`
* Resolución de módulos `Bundler`

No se requiere Webpack, Vite ni otro bundler.

La aplicación funciona directamente en el navegador mediante módulos ES (`<script type="module">`).

## 14. Consideraciones finales

El sistema fue desarrollado utilizando TypeScript orientado a objetos y manipulación directa del DOM, sin frameworks de frontend ni backend.

La arquitectura separa las responsabilidades entre modelos, servicios, validadores, controladores y vistas.

Los datos son almacenados exclusivamente en memoria, por lo que se reinician al recargar completamente la aplicación.

El proyecto implementa las reglas de negocio, validaciones, cálculos automáticos y listas en cascada necesarias para digitalizar el proceso de registro y gestión de Notas Conceptuales de la Convocatoria 2026.
