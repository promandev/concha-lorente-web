# obra-consulta Specification

## Purpose

Permite que quien está interesado en una obra concreta pueda consultarla o ir a comprarla directamente desde su ficha, sin tener que recordar datos ni buscar otra página, y que vea si la obra está disponible.

## Requirements

### Requirement: Acción principal de consulta en la ficha
Toda ficha de obra SHALL mostrar una acción principal "Consultar esta obra" visible sin desplazarse en escritorio y junto a la cartela en móvil, que abra el cliente de correo con un mensaje dirigido a la dirección de contacto del sitio.

#### Scenario: Consulta con datos de la obra prellenados
- **WHEN** una persona activa "Consultar esta obra" en la ficha de "Cudillero"
- **THEN** se abre un correo nuevo dirigido a la dirección de contacto del sitio
- **AND** el asunto contiene el título de la obra
- **AND** el cuerpo contiene título, técnica, dimensiones y la dirección web de esa ficha

#### Scenario: Caracteres especiales en el título
- **WHEN** el título o la técnica de una obra contiene acentos, comillas o "&"
- **THEN** el asunto y el cuerpo del correo muestran esos caracteres correctamente, sin cortarse ni codificarse de forma visible

### Requirement: Enlace secundario a la tienda
La ficha de obra SHALL ofrecer un enlace secundario "Ver en Artelista" a la tienda online de la artista, usando `https`, subordinado visualmente a la acción principal.

#### Scenario: Enlace a la tienda
- **WHEN** una persona activa "Ver en Artelista" en cualquier ficha
- **THEN** se abre la tienda de la artista en una pestaña nueva con `rel="noopener noreferrer"`

#### Scenario: Jerarquía entre acciones
- **WHEN** la ficha se muestra en cualquier ancho de pantalla
- **THEN** "Consultar esta obra" tiene mayor peso visual que "Ver en Artelista"

### Requirement: Disponibilidad opcional de la obra
El contenido de cada obra SHALL admitir un campo opcional `disponibilidad` con los valores `Disponible`, `Vendida` o `Consultar`, y la ficha SHALL mostrar ese valor en la cartela junto a técnica, dimensiones y fecha cuando exista.

#### Scenario: Obra con disponibilidad
- **WHEN** una obra define `disponibilidad: Vendida`
- **THEN** la cartela de su ficha muestra "Disponibilidad" con el valor "Vendida"

#### Scenario: Obra sin disponibilidad
- **WHEN** una obra no define `disponibilidad`
- **THEN** la cartela no muestra ninguna fila de disponibilidad
- **AND** la acción de consulta y el enlace a la tienda siguen apareciendo

#### Scenario: Valor no permitido
- **WHEN** una obra define un valor de `disponibilidad` distinto de los tres permitidos
- **THEN** la construcción del sitio falla con un error de validación que nombra el campo y la obra

### Requirement: Consulta sobre una obra vendida
Cuando una obra tenga `disponibilidad: Vendida`, la acción principal SHALL pasar a "Consultar obra similar" y el correo prellenado SHALL indicar en el asunto que se pregunta por una obra similar a la vendida.

#### Scenario: Obra vendida
- **WHEN** una persona abre la ficha de una obra con `disponibilidad: Vendida`
- **THEN** la acción principal se llama "Consultar obra similar"
- **AND** el asunto del correo prellenado menciona el título de la obra vendida y que se busca algo similar

### Requirement: Estilo y accesibilidad de las acciones
Las acciones de la ficha SHALL seguir el sistema de DESIGN.md (píldora, Forest Ink sólido para la principal, oliva solo como texto o línea) y SHALL tener un objetivo táctil mínimo de 44px de alto y orden de tabulación lógico.

#### Scenario: Navegación por teclado
- **WHEN** una persona recorre la ficha con el teclado
- **THEN** llega a "Consultar esta obra" y después a "Ver en Artelista" antes de los enlaces de anterior y siguiente

#### Scenario: Sin movimiento propio
- **WHEN** el visitante tiene activado `prefers-reduced-motion`
- **THEN** las acciones no añaden ningún desplazamiento ni animación de entrada
