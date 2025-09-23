FROM mongo:7.0

# Cria diretórios necessários
RUN mkdir -p /var/log/mongodb /data/keyfile

# Gera keyfile para replica set com auth
RUN openssl rand -base64 756 > /data/keyfile/keyfile && \
    chown mongodb:mongodb /data/keyfile/keyfile && \
    chmod 600 /data/keyfile/keyfile

# Script de inicialização
ENTRYPOINT set -e; \
echo "🚀 Iniciando MongoDB 7.0 com Replica Set..."; \
# Primeiro: inicia sem auth para setup inicial
mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip 0.0.0.0 & MONGOD_PID=$!; \
# Aguarda MongoDB estar pronto
until mongosh admin --port $MONGO_REPLICA_PORT --eval "db.runCommand('ping').ok" --quiet; do sleep 1; done; \
echo "📡 MongoDB conectado, configurando replica set..."; \
# Inicia replica set
INIT_REPL_CMD="try { rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }] }); print('✅ Replica set initialized'); } catch(e) { print('ℹ️  Replica set already exists or error:', e); }"; \
mongosh admin --port $MONGO_REPLICA_PORT --eval "$INIT_REPL_CMD" --quiet; \
# Aguarda replica set estar pronto
until mongosh admin --port $MONGO_REPLICA_PORT --eval "rs.isMaster().ismaster" --quiet; do sleep 1; done; \
echo "👤 Criando usuário root..."; \
# Cria usuário root
INIT_USER_CMD="try { db.createUser({ user: '$MONGO_INITDB_ROOT_USERNAME', pwd: '$MONGO_INITDB_ROOT_PASSWORD', roles: [ 'root' ] }); print('✅ Root user created'); } catch(e) { print('ℹ️  User already exists or error:', e); }"; \
mongosh admin --port $MONGO_REPLICA_PORT --eval "$INIT_USER_CMD" --quiet; \
# Para o MongoDB temporário
kill $MONGOD_PID; wait $MONGOD_PID; \
echo "🔒 Reiniciando com autenticação ativada..."; \
# Reinicia com auth e keyfile
mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip 0.0.0.0 --auth --keyFile /data/keyfile/keyfile & MONGOD_PID=$!; \
echo "✅ MONGODB 7.0 WITH REPLICA SET + AUTH READY FOR PRISMA!"; \
wait $MONGOD_PID;
