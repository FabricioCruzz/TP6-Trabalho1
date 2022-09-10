# API de Horário de Aulas

## Clonando repositório:
```
git clone https://github.com/FabricioCruzz/TP6-Trabalho1.git
cd TP6-Trabalho1
```

## Rodando o projeto localmente:
Na raiz do diretório do projeto executar:
```
npm install
```

Para subir o servidor:
```
npm start
```

## Docker

Sem o docker-compose:
```
docker build -t node:alpine .
docker run -p 8087:8087 node:alpine
```
Com docker-compose:
Instalar (caso não tenha instalado):
Vide a [documentação do Docker](https://docs.docker.com/compose/install/) para instalar de acordo com o seu sistema operacional.

Após a instalação executar o seguinte comando:
```
docker-compose up
```
> **_NOTA:_** Executar dentro da raiz do diretório com o Dockerfile.

## API
Endpoint da API:
```
POST http://localhost:8087/api/v1/classes
```
O payload deve ser um JSON e deve estar na seguinte forma:
```
{
    "ano":"2022",
    "semestre":"2",
    "diasDaSemana":[1, 2, 3, 4, 5]
}
```
> **_NOTA:_** Os valores do array para os dias da semana podem variar somente de 1 a 5. Valores no exemplo meramente ilustrativos.
