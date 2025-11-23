    # Base: Imagem Node
    FROM node:20-alpine

    # Configura o diretório de trabalho
    WORKDIR /app

    # Instala dependências (para cache otimizado)
    # Copiamos apenas o package.json primeiro para aproveitar o cache do Docker
    COPY package*.json ./
    RUN npm install

    # Copia o código-fonte restante
    # O volume no docker-compose.yml cuidará de manter o 'src' sincronizado
    COPY . .

    # Expõe a porta padrão do Vite Dev Server
    EXPOSE 5173

    # Comando para iniciar o servidor de desenvolvimento
    CMD ["npm", "run", "dev", "--", "--host"]