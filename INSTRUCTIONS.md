# 1962 Instructions

## Architecture and files

The project contains:

- README
- INSTRUCTIONS.md
- CONTRIBUTORS
- PIECE
- /media
- /extra

### README.md

Summary of the project used for the GitHub project homepage and the project website. This file follows the [Markdown](http://en.wikipedia.org/wiki/Markdown) syntax.

### INSTRUCTIONS.md

The file you are reading now. It explains the project and how to participate. This file follows the [Markdown](http://daringfireball.net/projects/markdown/syntax) syntax.

### CONTRIBUTORS

List of the contributors to the project. To write / edit this file, see *Syntax*.

### PIECE

Source code of the physical sculpture 1962. In this file are depicted and documented all the objects which constitute a sculpture version and all the informations about the sculpture version itself.

### /media

Folder containing images of the current state of the piece and archives of past versions. This folder must be updated at least with photographs of the sculpture for each versions.

### /extra

Folder (optional). It can be used as an addenda, an annexe or the archive of complementary documents such as process pictures, drawings films…

## Syntax

1962's files CONTRIBUTORS and PIECE follow a couple of simple syntaxic rules:

### Basics

- Use the format "Key: value"
- Parentchip relationship are symbolised using indentation (hit [tab](http://en.wikipedia.org/wiki/Tab_character) key at the begining of a line). Demonstration:

        Name: Floral foam brick
        Size
            Width: 22,5cm
            Height: 10,6cm
            Depth: 8cm

- A line can't stay empty
- A line must begin with a capital
- A line can contain a title or a couple "key: value"

### Main informations

Details to understand the PIECE file:

    *     = Required informations
    //    = Comments
    Text: = Needs a nalue
    Text  = Is a title

The PIECE file template:

    Title: 1962
        Branch name: * // Ex.: Master
        Project curator: * // Name of the owner of the project
        Repository URL: * // Ex.: https://github.com/raphaelbastide/1962
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
        Position of the origin: * // Free description of a point. Each object's position will be relative to this point.
        Capture hardware
            Type: // Can be photographic, video, video stream, drawing, 3D capture…
            Model: // free description
            X position: // Relative to the given origin
            Y position:
            Z position:
            Angle:
        Lighting hardware
            Natural // or, if artificial:
            X position: // Relative to the given origin
            Y position:
            Z position:
            Angle:
        Objects *
            ID: * // Define the identifier for the object. First one must be 0, then 1, 2, 3…
                Name: * // A name of the object
                Size
                    Width: *
                    Height: *
                    Depth: *
                Position
                    X position: * // Relative to the given origin
                    Y position: *
                    Z position: *
                    Position description: // Free description of the position.
                Color / texture:
            ID: 1 // Here can begin a second object
                Name: 
                ...