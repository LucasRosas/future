let antes = `<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>

    <link rel="shortcut icon" href="https://lucasrosas.github.io/future/img/iconfuture.png" type="image/x-icon">

    <script src="https://lucasrosas.github.io/future/js/chroma.min.js"></script>



    <script src="https://lucasrosas.github.io/future/js/FileSaver.js"></script>
    <script src="https://lucasrosas.github.io/future/js/antesedepois.js"></script>

    <link rel="stylesheet" href="https://lucasrosas.github.io/future/css/balloon.min.css">

    <link rel="stylesheet" href="https://lucasrosas.github.io/future/css/estilos2.css">


    <script src="https://kit.fontawesome.com/029cf7ac2a.js" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="https://lucasrosas.github.io/future/css/font-awesome.min.css">

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Hepta+Slab:wght@400;600&family=Lexend+Deca&family=Montserrat:wght@200;600&family=Nunito&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://lucasrosas.github.io/future/css/katex.min.css" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.13.0/dist/katex.min.js" integrity="sha384-FaFLTlohFghEIZkw6VGwmf9ISTubWAVYW8tG8+w2LAIftJEULZABrF9PPFv+tVkH" crossorigin="anonymous"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.13.0/dist/contrib/auto-render.min.js" integrity="sha384-bHBqxz8fokvgoJ/sc17HODNxa42TlaEhB+w8ZJXTc2nZf1VgEaFZeZvT4Mznfz0v" crossorigin="anonymous" onload="renderMathInElement(document.body);"></script>


    <script src="https://lucasrosas.github.io/future/js/bodymovin.js"></script>


</head>

<body>`
let depois = `<script type="module"> import renderMathInElement from "https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/contrib/auto-render.mjs"; renderMathInElement(document.body); renderMathInElement( document.body, { delimiters: [ {left: "$$", right: "$$", display: true}, {left: "\\[",
right: "\\]", display: true}, {left: "$", right: "$", display: false}, {left: "\\(", right: "\\)", display: false} ] } ); document.addEventListener("DOMContentLoaded", function() { renderMathInElement(document.body, { strict: false }); }); </script>
<script src="https://lucasrosas.github.io/future/js/javas.js"></script>
<script>
estilo = ${estilo}
</script>
</body>

</html>`