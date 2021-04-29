<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>Document</title> 
</head>
<body>
    <div id="app-root" class="container">
        <div class="row">
            <user-card v-for="usuario in usuarios"
                :titlePhoto="Foto1"
                :titleCard="Card"
                :linkCard="www.google.es"
                :linkName="Google"
            >
                <template #bodyCard>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati sed, voluptates ipsam veritatis inventore atque soluta voluptatibus quasi expedita sequi maxime, autem voluptatem iure nemo vitae adipisci eius ipsa magni.
                </template>
            </user-card>
        </div>
    </div>
    <script type="text/javascript" src="js/vue.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

    <script type="text/x-template" id="user-card">
        <div class="col">
            <div class="card">
                <img :src="photo" class="card-img-top" :alt="titlePhoto">
                <div class="card-body">
                    <h5 class="card-title">{{ titleCard }}</h5>
                    <slot name="bodyCard"></slot>
                    <a :href="linkCard" class="btn btn-primary">{{ linkName }}</a>
                </div>
            </div>
        </div>
    </script>
    <script type="text/javascript" src="js/app.js"></script>
</body>
</html>
