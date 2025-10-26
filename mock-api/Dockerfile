    # Base: Imagem Node
    FROM node:20-alpine

    # Define o diretório de trabalho
    WORKDIR /usr/src/app

    # Instala o json-server globalmente dentro do contêiner
    RUN npm install -g json-server

    # Copia o banco de dados para dentro do contêiner
    COPY database.json .

    # Expõe a porta que o json-server usará
    EXPOSE 3004

    # Comando para iniciar o servidor
    # --host 0.0.0.0 é essencial para permitir acesso externo ao contêiner
    CMD ["json-server", "--watch", "database.json", "--port", "3004", "--host", "0.0.0.0"]