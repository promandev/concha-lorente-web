# Spec Delta

## Purpose

Define cómo se presenta el catálogo de obras de Concha Lorente: organizado en salas por serie y con cada pintura mostrada entera, en su proporción natural, para que quien recorre la obra vea los cuadros tal como son y llegue a la ficha de uno con un clic.

## ADDED Requirements

### Requirement: Salas por serie
El catálogo SHALL agrupar todas las obras en una sala por serie, en este orden: Estructuras, Primeras etapas, Bocetos y dibujos, cada una con su título, y SHALL incluir cada obra en exactamente una sala.

#### Scenario: Orden y contenido de las salas
- **WHEN** se abre `/obra`
- **THEN** aparecen, de arriba abajo, las salas Estructuras, Primeras etapas y Bocetos y dibujos
- **AND** cada obra figura en la sala de su categoría y en ninguna otra

#### Scenario: Orden dentro de una sala
- **WHEN** una sala contiene varias obras
- **THEN** se muestran de la más reciente a la más antigua por fecha

#### Scenario: Serie sin obras
- **WHEN** una serie no tiene ninguna obra
- **THEN** su sala no se muestra

#### Scenario: Sin textos inventados
- **WHEN** se muestra una sala
- **THEN** solo lleva su título y sus obras, sin texto de presentación de relleno

### Requirement: Obras en su proporción natural
Cada obra SHALL mostrarse completa, sin recorte ni deformación, y las obras de una misma fila SHALL compartir altura con un ancho proporcional a su formato, rellenando el ancho disponible salvo en la última fila de cada sala y salvo que ensancharlas obligue a superar una altura máxima por obra.

#### Scenario: Obra muy apaisada y obra vertical en la misma sala
- **WHEN** una sala contiene `botellas-y-espejo` (muy apaisada) y obras verticales
- **THEN** todas se ven enteras con su proporción original
- **AND** en una fila compartida tienen la misma altura

#### Scenario: Última fila
- **WHEN** la última fila de una sala no completa el ancho
- **THEN** sus obras mantienen la altura base de fila y no se estiran hasta ocupar todo el ancho

#### Scenario: Fila que no puede ensancharse más
- **WHEN** rellenar el ancho de una fila obligaría a superar la altura máxima de sus obras
- **THEN** la fila conserva esa altura máxima y queda alineada a la izquierda, sin deformar ninguna obra

#### Scenario: Espacio reservado
- **WHEN** las imágenes aún no han cargado
- **THEN** cada obra ocupa ya su espacio final sobre el color Sage Mist y el contenido no se desplaza al cargar

### Requirement: Sin marco de tarjeta y con cartela
Las obras SHALL colgarse directamente sobre el fondo de la página, sin borde, sombra ni elevación al pasar el ratón, y cada una SHALL llevar debajo una cartela con su título, técnica y dimensiones.

#### Scenario: Aspecto de una obra
- **WHEN** se muestra una obra en una sala
- **THEN** no tiene tarjeta blanca, borde ni sombra, ni en reposo ni al pasar el ratón
- **AND** bajo la imagen aparecen el título, la técnica y las dimensiones

#### Scenario: Acceso a la ficha
- **WHEN** una persona activa una obra (imagen o cartela)
- **THEN** llega a la ficha de esa obra

### Requirement: Navegación entre salas
El catálogo SHALL ofrecer un salto a cada sala mediante enlaces de ancla que funcionen sin JavaScript, dejando la sala visible bajo la cabecera fija.

#### Scenario: Saltar a una sala
- **WHEN** una persona activa "Primeras etapas" en la navegación del catálogo
- **THEN** la página se desplaza a esa sala y su título queda visible bajo la cabecera fija

#### Scenario: Sin JavaScript
- **WHEN** el visitante tiene JavaScript desactivado
- **THEN** los saltos entre salas funcionan igual y todas las obras son visibles

### Requirement: Compatibilidad con los enlaces antiguos de filtro
Un enlace `/obra?categoria=<serie>` con una serie existente SHALL llevar a la sala de esa serie, y un valor desconocido SHALL mostrar el catálogo desde el principio sin error.

#### Scenario: Enlace antiguo válido
- **WHEN** se abre `/obra?categoria=bocetos-y-dibujos`
- **THEN** el catálogo se abre en la sala Bocetos y dibujos

#### Scenario: Valor desconocido
- **WHEN** se abre `/obra?categoria=otra-cosa`
- **THEN** el catálogo se muestra desde el principio sin ningún mensaje de error

### Requirement: Dimensiones de las imágenes conocidas al compilar
El sitio SHALL conocer el ancho y el alto reales de cada imagen al compilar, SHALL guardarlos en una caché versionada en el repositorio y SHALL reutilizarla en compilaciones posteriores sin volver a consultar la red.

#### Scenario: Compilación con la caché completa
- **WHEN** se compila el sitio y todas las obras están en la caché
- **THEN** no se descarga ninguna imagen para medirla

#### Scenario: Obra nueva
- **WHEN** se añade una obra cuya imagen no está en la caché
- **THEN** el build mide esa imagen y su dimensión queda disponible para colocarla en la pared

#### Scenario: Imagen que no se puede medir
- **WHEN** no se puede obtener la dimensión de una imagen
- **THEN** el build termina igualmente y esa obra se coloca con una proporción neutra de reserva
- **AND** el aviso nombra la obra afectada

### Requirement: Móvil y movimiento reducido
En pantallas de hasta 640px el catálogo SHALL mostrar una obra por fila a ancho completo y en su proporción, y la entrada de las obras SHALL respetar `prefers-reduced-motion`.

#### Scenario: Móvil
- **WHEN** se abre `/obra` en una ventana de 390px de ancho
- **THEN** cada obra ocupa todo el ancho útil, entera y en su proporción, sin desbordamiento horizontal

#### Scenario: Movimiento reducido
- **WHEN** el visitante tiene activado `prefers-reduced-motion`
- **THEN** las obras aparecen con un fundido corto sin desplazamiento
