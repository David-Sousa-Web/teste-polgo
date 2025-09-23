import { Router } from "express"
import { CreateWinnerController } from "../controllers/winners/CreateWinnerController"
import { GetWinnersController } from "../controllers/winners/GetWinnersController"
import { GetWinnerByIdController } from "../controllers/winners/GetWinnerByIdController"
import { UpdateWinnerController } from "../controllers/winners/UpdateWinnerController"
import { DeleteWinnerController } from "../controllers/winners/DeleteWinnerController"
import { GetWinnersAggregationController } from "../controllers/winners/GetWinnersAggregationController"

const router = Router()

// Instâncias dos controllers
const createWinnerController = new CreateWinnerController()
const getWinnersController = new GetWinnersController()
const getWinnerByIdController = new GetWinnerByIdController()
const updateWinnerController = new UpdateWinnerController()
const deleteWinnerController = new DeleteWinnerController()
const getWinnersAggregationController = new GetWinnersAggregationController()

/**
 * @swagger
 * components:
 *   schemas:
 *     Winner:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do ganhador
 *           example: "507f1f77bcf86cd799439011"
 *         fullName:
 *           type: string
 *           description: Nome completo do ganhador
 *           example: "João Silva Santos"
 *         state:
 *           type: string
 *           description: UF (validação de estados brasileiros)
 *           example: "SP"
 *         city:
 *           type: string
 *           description: Cidade de residência
 *           example: "São Paulo"
 *         prize:
 *           type: string
 *           description: Descrição do prêmio recebido
 *           example: "R$ 10.000,00"
 *         drawDate:
 *           type: string
 *           format: date-time
 *           description: Data do sorteio/ganho (ISO 8601)
 *           example: "2024-01-15T10:30:00.000Z"
 *     
 *     CreateWinnerRequest:
 *       type: object
 *       required:
 *         - fullName
 *         - state
 *         - city
 *         - prize
 *         - drawDate
 *       properties:
 *         fullName:
 *           type: string
 *           minLength: 2
 *           description: Nome completo do ganhador
 *           example: "João Silva Santos"
 *         state:
 *           type: string
 *           pattern: '^[A-Z]{2}$'
 *           description: UF (exatamente 2 caracteres)
 *           example: "SP"
 *         city:
 *           type: string
 *           minLength: 2
 *           description: Cidade de residência
 *           example: "São Paulo"
 *         prize:
 *           type: string
 *           minLength: 2
 *           description: Descrição do prêmio
 *           example: "R$ 10.000,00"
 *         drawDate:
 *           type: string
 *           format: date-time
 *           description: Data do sorteio (ISO 8601)
 *           example: "2024-01-15T10:30:00.000Z"
 *     
 *     UpdateWinnerRequest:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           minLength: 2
 *           description: Nome completo do ganhador
 *           example: "João Silva Santos"
 *         state:
 *           type: string
 *           pattern: '^[A-Z]{2}$'
 *           description: UF (exatamente 2 caracteres)
 *           example: "SP"
 *         city:
 *           type: string
 *           minLength: 2
 *           description: Cidade de residência
 *           example: "São Paulo"
 *         prize:
 *           type: string
 *           minLength: 2
 *           description: Descrição do prêmio
 *           example: "R$ 10.000,00"
 *         drawDate:
 *           type: string
 *           format: date-time
 *           description: Data do sorteio (ISO 8601)
 *           example: "2024-01-15T10:30:00.000Z"
 *     
 *     Pagination:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           description: Página atual
 *           example: 1
 *         limit:
 *           type: integer
 *           description: Itens por página
 *           example: 10
 *         total:
 *           type: integer
 *           description: Total de itens
 *           example: 50
 *         totalPages:
 *           type: integer
 *           description: Total de páginas
 *           example: 5
 *     
 *     ApiResponseSingle:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Operação realizada com sucesso"
 *         data:
 *           $ref: '#/components/schemas/Winner'
 *     
 *     ApiResponseWithPagination:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Dados recuperados com sucesso"
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Winner'
 *         pagination:
 *           $ref: '#/components/schemas/Pagination'
 *     
 *     ApiResponseArray:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Dados recuperados com sucesso"
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/StateAggregation'
 *     
 *     ApiResponseNull:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Ganhador excluído com sucesso"
 *         data:
 *           type: "null"
 *           example: null
 *     
 *     ApiErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           description: Mensagem de erro
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de erros específicos (opcional)
 *     
 *     StateAggregation:
 *       type: object
 *       properties:
 *         state:
 *           type: string
 *           description: UF do estado
 *           example: "SP"
 *         count:
 *           type: integer
 *           description: Quantidade de ganhadores neste estado
 *           example: 25
 */

/**
 * @swagger
 * /api/ganhadores:
 *   post:
 *     tags:
 *       - Ganhadores
 *     summary: Criar novo ganhador
 *     description: Criar novo ganhador com validação completa dos campos obrigatórios e formatação automática de dados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWinnerRequest'
 *     responses:
 *       201:
 *         description: Ganhador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Ganhador criado com sucesso"
 *                 data:
 *                   $ref: '#/components/schemas/Winner'
 *             example:
 *               success: true
 *               message: "Ganhador criado com sucesso"
 *               data:
 *                 id: "507f1f77bcf86cd799439011"
 *                 fullName: "João Silva Santos"
 *                 state: "SP"
 *                 city: "São Paulo"
 *                 prize: "R$ 10.000,00"
 *                 drawDate: "2024-01-15T10:30:00.000Z"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Dados inválidos"
 *               errors: ["Nome completo deve ter pelo menos 2 caracteres", "Estado deve ter exatamente 2 caracteres"]
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Erro interno do servidor"
 */
router.post('/', createWinnerController.execute.bind(createWinnerController))

/**
 * @swagger
 * /api/ganhadores:
 *   get:
 *     tags:
 *       - Ganhadores
 *     summary: Listar todos os ganhadores
 *     description: Listar todos os ganhadores com suporte a paginação inteligente e filtros avançados por estado, prêmio e nome do ganhador.
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Página atual
 *         example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Itens por página (máximo 100)
 *         example: 10
 *       - name: state
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtro por estado (busca parcial, case-insensitive)
 *         example: "SP"
 *       - name: city
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtro por cidade (busca parcial, case-insensitive)
 *         example: "São Paulo"
 *       - name: prize
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtro por prêmio (busca parcial, case-insensitive)
 *         example: "10000"
 *       - name: fullName
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtro por nome (busca parcial, case-insensitive)
 *         example: "João"
 *     responses:
 *       200:
 *         description: Lista de ganhadores recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseWithPagination'
 *             example:
 *               success: true
 *               message: "Dados recuperados com sucesso"
 *               data: 
 *                 - id: "507f1f77bcf86cd799439011"
 *                   fullName: "João Silva Santos"
 *                   state: "SP"
 *                   city: "São Paulo"
 *                   prize: "R$ 10.000,00"
 *                   drawDate: "2024-01-15T10:30:00.000Z"
 *                 - id: "507f1f77bcf86cd799439012"
 *                   fullName: "Maria Oliveira Costa"
 *                   state: "RJ"
 *                   city: "Rio de Janeiro"
 *                   prize: "R$ 5.000,00"
 *                   drawDate: "2024-01-20T14:15:00.000Z"
 *               pagination:
 *                 page: 1
 *                 limit: 10
 *                 total: 50
 *                 totalPages: 5
 *       400:
 *         description: Parâmetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Parâmetros inválidos"
 *               errors: ["Page deve ser um número inteiro positivo"]
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Erro interno do servidor"
 */
router.get('/', getWinnersController.execute.bind(getWinnersController))

/**
 * @swagger
 * /api/ganhadores/agregacao:
 *   get:
 *     tags:
 *       - Ganhadores
 *     summary: Agregação por Estado
 *     description: Implementa uma rota específica /ganhadores/agregacao que retorna o total de ganhadores por estado (UF), alimentando o mapa interativo no frontend com dados otimizados.
 *     responses:
 *       200:
 *         description: Agregação por estado recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseArray'
 *             example:
 *               success: true
 *               message: "Agregação por estado recuperada com sucesso"
 *               data: 
 *                 - state: "SP"
 *                   count: 25
 *                 - state: "RJ"
 *                   count: 18
 *                 - state: "MG"
 *                   count: 12
 *                 - state: "RS"
 *                   count: 8
 *                 - state: "PR"
 *                   count: 5
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Erro interno do servidor"
 */
router.get('/agregacao', getWinnersAggregationController.execute.bind(getWinnersAggregationController))

/**
 * @swagger
 * /api/ganhadores/{id}:
 *   get:
 *     tags:
 *       - Ganhadores
 *     summary: Buscar ganhador por ID
 *     description: Buscar um ganhador específico pelo seu ID único com validação de formato ObjectId.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: ID único do ganhador (formato ObjectId)
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Ganhador encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Ganhador encontrado com sucesso"
 *                 data:
 *                   $ref: '#/components/schemas/Winner'
 *             example:
 *               success: true
 *               message: "Ganhador encontrado com sucesso"
 *               data:
 *                 id: "507f1f77bcf86cd799439011"
 *                 fullName: "João Silva Santos"
 *                 state: "SP"
 *                 city: "São Paulo"
 *                 prize: "R$ 10.000,00"
 *                 drawDate: "2024-01-15T10:30:00.000Z"
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "ID inválido"
 *               errors: ["ID deve ter 24 caracteres hexadecimais"]
 *       404:
 *         description: Ganhador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Ganhador não encontrado"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Erro interno do servidor"
 */
router.get('/:id', getWinnerByIdController.execute.bind(getWinnerByIdController))

/**
 * @swagger
 * /api/ganhadores/{id}:
 *   put:
 *     tags:
 *       - Ganhadores
 *     summary: Editar ganhador existente
 *     description: Editar ganhador existente com validação de integridade e log de alterações para auditoria.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: ID único do ganhador (formato ObjectId)
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateWinnerRequest'
 *     responses:
 *       200:
 *         description: Ganhador atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Ganhador atualizado com sucesso"
 *                 data:
 *                   $ref: '#/components/schemas/Winner'
 *             example:
 *               success: true
 *               message: "Ganhador atualizado com sucesso"
 *               data:
 *                 id: "507f1f77bcf86cd799439011"
 *                 fullName: "João Silva Santos"
 *                 state: "SP"
 *                 city: "São Paulo"
 *                 prize: "R$ 15.000,00"
 *                 drawDate: "2024-01-15T10:30:00.000Z"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Dados inválidos"
 *               errors: ["Nome completo deve ter pelo menos 2 caracteres", "Estado deve ter exatamente 2 caracteres"]
 *       404:
 *         description: Ganhador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Ganhador não encontrado"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Erro interno do servidor"
 */
router.put('/:id', updateWinnerController.execute.bind(updateWinnerController))

/**
 * @swagger
 * /api/ganhadores/{id}:
 *   delete:
 *     tags:
 *       - Ganhadores
 *     summary: Excluir ganhador
 *     description: Exclusão segura de ganhador com confirmação e possibilidade de soft delete para manter histórico.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: ID único do ganhador (formato ObjectId)
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Ganhador excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseNull'
 *             example:
 *               success: true
 *               message: "Ganhador excluído com sucesso"
 *               data: null
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "ID inválido"
 *               errors: ["ID deve ter 24 caracteres hexadecimais"]
 *       404:
 *         description: Ganhador não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Ganhador não encontrado"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Erro interno do servidor"
 */
router.delete('/:id', deleteWinnerController.execute.bind(deleteWinnerController))

export { router as winnersRoutes }
