# Memória Política

Código-fonte do [Memória Política](https://memoriapolitica.org/).

## Desenvolvimento

Ferramentas usadas para o desenvolvimento:

* [Docker](https://docker.com/)
* [Docker Compose](https://docs.docker.com/compose)

Para subir uma instância do Memória Política:

    $ docker-compose build
    $ docker-compose up

Para executar os utilitários de informação:

    $ docker-compose run queridas aranhas --help

Para subir um ambiente somente com o Memória Política, sem os utilitários de informação:

    $ docker-compose -f docker-compose.yml build
    $ docker-compose -f docker-compose.yml up
