import { Router } from "express"
import { CreateStoreController } from "../controllers/stores/CreateStoreController"
import { GetStoresController } from "../controllers/stores/GetStoresController"
import { GetStoreByIdController } from "../controllers/stores/GetStoreByIdController"
import { UpdateStoreController } from "../controllers/stores/UpdateStoreController"
import { DeleteStoreController } from "../controllers/stores/DeleteStoreController"

const router = Router()

const createStoreController = new CreateStoreController()
const getStoresController = new GetStoresController()
const getStoreByIdController = new GetStoreByIdController()
const updateStoreController = new UpdateStoreController()
const deleteStoreController = new DeleteStoreController()

/**
 * @swagger
 * components:
 *   schemas:
 *     Store:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único da loja
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           description: Nome da loja
 *           example: "Loja Central Shopping"
 *         cnpj:
 *           type: string
 *           description: CNPJ da loja (apenas números)
 *           example: "12345678000195"
 *         state:
 *           type: string
 *           description: UF (validação de estados brasileiros)
 *           example: "SP"
 *         city:
 *           type: string
 *           description: Cidade onde a loja está localizada
 *           example: "São Paulo"
 *         address:
 *           type: string
 *           description: Endereço completo da loja
 *           example: "Rua das Flores, 123, Centro"
 *         latitude:
 *           type: number
 *           format: float
 *           nullable: true
 *           description: Latitude obtida via geocoding
 *           example: -23.5505
 *         longitude:
 *           type: number
 *           format: float
 *           nullable: true
 *           description: Longitude obtida via geocoding
 *           example: -46.6333
 *     
 *     CreateStoreRequest:
 *       type: object
 *       required:
 *         - name
 *         - cnpj
 *         - state
 *         - city
 *         - address
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           description: Nome da loja
 *           example: "Loja Central Shopping"
 *         cnpj:
 *           type: string
 *           pattern: '^\\d{2}\\.?\\d{3}\\.?\\d{3}\\/?\\d{4}-?\\d{2}$'
 *           description: CNPJ da loja (com ou sem formatação)
 *           example: "12.345.678/0001-95"
 *         state:
 *           type: string
 *           pattern: '^[A-Z]{2}$'
 *           description: UF (exatamente 2 caracteres)
 *           example: "SP"
 *         city:
 *           type: string
 *           minLength: 2
 *           description: Cidade onde a loja está localizada
 *           example: "São Paulo"
 *         address:
 *           type: string
 *           minLength: 5
 *           description: Endereço completo da loja
 *           example: "Rua das Flores, 123, Centro"
 *     
 *     UpdateStoreRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           description: Nome da loja
 *           example: "Loja Central Shopping"
 *         cnpj:
 *           type: string
 *           pattern: '^\\d{2}\\.?\\d{3}\\.?\\d{3}\\/?\\d{4}-?\\d{2}$'
 *           description: CNPJ da loja (com ou sem formatação)
 *           example: "12.345.678/0001-95"
 *         state:
 *           type: string
 *           pattern: '^[A-Z]{2}$'
 *           description: UF (exatamente 2 caracteres)
 *           example: "SP"
 *         city:
 *           type: string
 *           minLength: 2
 *           description: Cidade onde a loja está localizada
 *           example: "São Paulo"
 *         address:
 *           type: string
 *           minLength: 5
 *           description: Endereço completo da loja
 *           example: "Rua das Flores, 123, Centro"
 */

/**
 * @swagger
 * /api/lojas:
 *   post:
 *     tags:
 *       - Lojas
 *     summary: Criar nova loja
 *     description: Criar nova loja com validação de CNPJ, estados brasileiros e obtenção automática de coordenadas via geocoding.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStoreRequest'
 *     responses:
 *       201:
 *         description: Loja criada com sucesso
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
 *                   example: "Loja criada com sucesso"
 *                 data:
 *                   $ref: '#/components/schemas/Store'
 *             example:
 *               success: true
 *               message: "Loja criada com sucesso"
 *               data:
 *                 id: "507f1f77bcf86cd799439011"
 *                 name: "Loja Central Shopping"
 *                 cnpj: "12345678000195"
 *                 state: "SP"
 *                 city: "São Paulo"
 *                 address: "Rua das Flores, 123, Centro"
 *                 latitude: -23.5505
 *                 longitude: -46.6333
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Dados inválidos"
 *               errors: ["Nome da loja deve ter pelo menos 2 caracteres", "CNPJ deve ter formato válido"]
 *       409:
 *         description: CNPJ já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Já existe uma loja cadastrada com este CNPJ"
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
router.post('/', createStoreController.execute.bind(createStoreController))

/**
 * @swagger
 * /api/lojas:
 *   get:
 *     tags:
 *       - Lojas
 *     summary: Listar todas as lojas
 *     description: Listar todas as lojas com suporte a paginação e filtros por estado, cidade e nome da loja.
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
 *       - name: name
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtro por nome da loja (busca parcial, case-insensitive)
 *         example: "Shopping"
 *     responses:
 *       200:
 *         description: Lista de lojas recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseWithPagination'
 *             example:
 *               success: true
 *               message: "Dados recuperados com sucesso"
 *               data: 
 *                 - id: "507f1f77bcf86cd799439011"
 *                   name: "Loja Central Shopping"
 *                   cnpj: "12345678000195"
 *                   state: "SP"
 *                   city: "São Paulo"
 *                   address: "Rua das Flores, 123, Centro"
 *                   latitude: -23.5505
 *                   longitude: -46.6333
 *                 - id: "507f1f77bcf86cd799439012"
 *                   name: "Loja Norte"
 *                   cnpj: "98765432000111"
 *                   state: "RJ"
 *                   city: "Rio de Janeiro"
 *                   address: "Av. Copacabana, 456"
 *                   latitude: -22.9711
 *                   longitude: -43.1822
 *               pagination:
 *                 page: 1
 *                 limit: 10
 *                 total: 25
 *                 totalPages: 3
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
router.get('/', getStoresController.execute.bind(getStoresController))


/**
 * @swagger
 * /api/lojas/{id}:
 *   get:
 *     tags:
 *       - Lojas
 *     summary: Buscar loja por ID
 *     description: Buscar uma loja específica pelo seu ID único com validação de formato ObjectId.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: ID único da loja (formato ObjectId)
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Loja encontrada com sucesso
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
 *                   example: "Loja encontrada com sucesso"
 *                 data:
 *                   $ref: '#/components/schemas/Store'
 *             example:
 *               success: true
 *               message: "Loja encontrada com sucesso"
 *               data:
 *                 id: "507f1f77bcf86cd799439011"
 *                 name: "Loja Central Shopping"
 *                 cnpj: "12345678000195"
 *                 state: "SP"
 *                 city: "São Paulo"
 *                 address: "Rua das Flores, 123, Centro"
 *                 latitude: -23.5505
 *                 longitude: -46.6333
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
 *         description: Loja não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Loja não encontrada"
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
router.get('/:id', getStoreByIdController.execute.bind(getStoreByIdController))

/**
 * @swagger
 * /api/lojas/{id}:
 *   put:
 *     tags:
 *       - Lojas
 *     summary: Atualizar loja existente
 *     description: Atualizar loja existente com validação de CNPJ único, estados brasileiros e reobtendo coordenadas se endereço mudar.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: ID único da loja (formato ObjectId)
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStoreRequest'
 *     responses:
 *       200:
 *         description: Loja atualizada com sucesso
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
 *                   example: "Loja atualizada com sucesso"
 *                 data:
 *                   $ref: '#/components/schemas/Store'
 *             example:
 *               success: true
 *               message: "Loja atualizada com sucesso"
 *               data:
 *                 id: "507f1f77bcf86cd799439011"
 *                 name: "Loja Central Shopping - Renovada"
 *                 cnpj: "12345678000195"
 *                 state: "SP"
 *                 city: "São Paulo"
 *                 address: "Rua das Flores, 456, Centro"
 *                 latitude: -23.5508
 *                 longitude: -46.6335
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Dados inválidos"
 *               errors: ["Nome da loja deve ter pelo menos 2 caracteres"]
 *       404:
 *         description: Loja não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Loja não encontrada"
 *       409:
 *         description: CNPJ já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Já existe uma loja cadastrada com este CNPJ"
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
router.put('/:id', updateStoreController.execute.bind(updateStoreController))

/**
 * @swagger
 * /api/lojas/{id}:
 *   delete:
 *     tags:
 *       - Lojas
 *     summary: Excluir loja
 *     description: Exclusão segura de loja usando soft delete para manter histórico e integridade referencial.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: ID único da loja (formato ObjectId)
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Loja excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseNull'
 *             example:
 *               success: true
 *               message: "Loja excluída com sucesso"
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
 *         description: Loja não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Loja não encontrada"
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
router.delete('/:id', deleteStoreController.execute.bind(deleteStoreController))

export { router as storesRoutes }
