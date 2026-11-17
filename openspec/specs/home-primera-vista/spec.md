# home-primera-vista Specification

## Purpose

Define lo que ve una persona al abrir la home: una pintura de Concha Lorente grande y completa como protagonista de la primera vista, con el nombre y la cita del crítico como apoyo, y cómo se elige esa pintura desde el contenido.

## Requirements

### Requirement: Pintura protagonista en la primera vista
La home SHALL mostrar una pintura grande y completa, sin recortar, dentro de la primera pantalla en escritorio y en móvil, sin necesidad de desplazarse.

#### Scenario: Escritorio
- **WHEN** se abre la home en una ventana de 1280×800
- **THEN** la pintura aparece entera dentro de la primera pantalla, sin bordes cortados y con su proporción original

#### Scenario: Móvil
- **WHEN** se abre la home en una ventana de 390 de ancho
- **THEN** la pintura ocupa todo el ancho útil, aparece entera y empieza dentro de la primera pantalla

### Requirement: Cita del crítico como línea menor
La cita del crítico SHALL conservar exactamente su texto y su atribución, y SHALL mostrarse como línea de apoyo menor que la pintura y que el título de la página, después de la pintura.

#### Scenario: Texto inalterado
- **WHEN** se compara el texto de la cita y de su atribución con los de antes del cambio
- **THEN** son idénticos carácter por carácter

#### Scenario: Jerarquía
- **WHEN** se mide la primera vista
- **THEN** el tamaño de la cita es menor que el de la pintura y que el del título "Concha Lorente"

### Requirement: Obra de portada elegida desde el contenido
La pintura de la primera vista SHALL elegirse con el campo opcional `portada` del contenido de las obras: la primera obra con `portada: true`, o la más reciente si ninguna lo define, sin depender de una posición fija en el código.

#### Scenario: Obra marcada como portada
- **WHEN** exactamente una obra define `portada: true`
- **THEN** esa obra es la pintura de la primera vista

#### Scenario: Ninguna obra marcada
- **WHEN** ninguna obra define `portada`
- **THEN** se muestra la obra más reciente por fecha

#### Scenario: Reordenar el catálogo
- **WHEN** se añaden o reordenan obras sin cambiar el campo `portada`
- **THEN** la pintura de la primera vista no cambia

### Requirement: Acceso a la obra desde la primera vista
La primera vista SHALL ofrecer una cartela con el título de la pintura mostrada enlazando a su ficha, y la acción "Ver obra completa" hacia el catálogo.

#### Scenario: Cartela enlazada
- **WHEN** una persona activa el título de la cartela de la primera vista
- **THEN** llega a la ficha de esa obra

### Requirement: Carga y movimiento de la primera vista
La pintura de la primera vista SHALL cargarse con prioridad y reservar su espacio para no desplazar el resto de la página, y su entrada SHALL respetar `prefers-reduced-motion`.

#### Scenario: Sin desplazamiento de layout
- **WHEN** la imagen termina de cargar en una conexión lenta
- **THEN** el contenido bajo la primera vista no se desplaza

#### Scenario: Movimiento reducido
- **WHEN** el visitante tiene activado `prefers-reduced-motion`
- **THEN** la entrada de la primera vista es un fundido corto sin desplazamiento
