# 🔹 Fase 1: Build (instalação de dependências e build da aplicação)
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos essenciais antes da instalação
COPY ../package.json ../package-lock.json ./

# Altera permissões para evitar problemas na instalação
RUN chown -R node:node /app

# Executa como usuário node
USER node

# Instala TODAS as dependências (incluindo devDependencies)
RUN npm ci --include=dev

# Copia os arquivos da aplicação
COPY --chown=node:node ../ . 

# Compila a aplicação
RUN npm run build

# 🔹 Fase 2: Runtime (imagem final mínima)
FROM node:20-alpine

WORKDIR /app

# Copia apenas arquivos essenciais da fase de build
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

# Instala o `serve` globalmente antes de trocar de usuário
RUN npm install -g serve

# Define usuário não root para maior segurança
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expõe a porta da aplicação
EXPOSE 3000

# Comando de entrada para rodar a aplicação em produção
CMD ["serve", "-s", "build", "-l", "3000", "--single"]