# API de Horário de Aulas

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

Instalar o docker-compose (caso não tenha instalado):
Vide a [documentação do Docker](https://docs.docker.com/compose/install/) para instalar de acordo com o seu sistema operacional.

Como executar o contêiner da aplicação:
```
docker-compose up
```
> **_NOTA:_** Executar dentro da raiz do diretório com o Dockerfile.

## API
Onde fazer o POST:
```
POST localhost:8087/api/v1/classes
```
O payload deve ser um JSON e deve estar na seguinte forma:
```
{
    "ano":"2022",
    "semestre":"2",
    "diasDaSemana":[1, 3, 5]
}
```
> **_NOTA:_** Os valores do array para os dias da semana podem variar somente de 1 a 5. Valores no exemplo meramente ilustrativos.
