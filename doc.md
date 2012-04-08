# 1962 Documentation

## Architecture and files

The project contains:

- doc.md
- README
- CONTRIBUTORS
- INSTALLATION

### doc.md

The file you are reading now. It explain the project and how to participate. This file follows the [Markdown](http://daringfireball.net/projects/markdown/syntax) syntax.

### README.md

Summary of the project used for the GitHub the project website. This file follows the [Markdown](http://en.wikipedia.org/wiki/Markdown) syntax.

### CONTRIBUTORS

List of the contributors to the project. To write / edit this file, see <a href="#Syntax">Syntax</a>.

### INSTALLATION

Source code of the physical sculpture 1962. In this file are depicted and documented all the objects which constitute a sculpture version and all the informations about the sculpture version itself.

## Syntax

1962's files CONTRIBUTORS and DOCUMENTATION follows a couple of simple syntaxic rules.

### Basics

- Use the format "Key: value"
- Parentchip relationship are symbolised using indentation (hit [tab](en.wikipedia.org/wiki/Tab_character) key at the begining of a line) Demo:

    Name: Floral foam brick
    Size
        Width: 22,5cm
        Height: 10,6cm
        Depth: 8cm

- A line can't stay empty
- A line must begin with a capital
- A line can contain a title or a couple "key: value"

### Main informations

    *     = Required informations
    //    = comments
    Text: = needs a nalue
    Text  = is a title

    Title: *
        Project curator: *
        Physical location
            Latitude: *
            Longitude: *
            Altitude:
            City:
            Country: *
        Sculpture surface // in centimeters (cm)
            Width: *
            Height: *
            Depth:
        Position of the origin: * // free description of a point. Each object's position will be relative to this point.
        Capture hardware
            Type: // Can be photographic, video, video stream, drawing, 3D capture…
            Model: // free description
            X position:
            Y position:
            Z position:
            Angle:
        Lighting hardware
            Natural // or:
            X position:
            Y position:
            Z position:
            Angle:
        Objects
            ID: // Define the identifier for the object. First one must be 0, the 1, 2, 3…
                Name: // A name of the object
                Size
                    Width:
                    Height:
                    Depth:
                Position
                    X position: 0
                    Y position: 0
                    Z position: 0
                    Position description: The plank is put down on the floor on its bigger facet the simpler way
                Color / texture: White
            ID: 2
                Name: Floral foam brick
                Size
                    Width: 22,5cm
                    Height: 10,6cm
                    Depth: 8cm
                Position
                    X position: 14cm
                    Y position: 28cm
                    Z position: 0.4cm
                    Position description: The floral foam brick is put down on the white plank on its largest side the simpler way
                Color / texture: Pale green
           ID: 3
                Name: External hard disk drive
                Model: Pika One FLS-U2-160
                Size
                    Width: 20,5cm
                    Height: 14,5cm
                    Depth: 3cm
                Position
                    X position: 14cm
                    Y position: 28cm
                    Z position: 
                    Position description: The External hard disk drive is partly embedded into the top side of the floral foam brick. Angle and embed depth are free.
                Color / texture: Pale green 