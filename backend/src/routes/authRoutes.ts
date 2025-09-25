import { Router } from 'express'
import { AuthController } from '../controllers/auth/AuthController'

const router = Router()

const authController = new AuthController()

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Nome de usuário
 *           example: "admin"
 *         password:
 *           type: string
 *           description: Senha do usuário
 *           example: "123456"
 *     
 *     LoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Login realizado com sucesso"
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: Token JWT para autenticação
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *             expiresIn:
 *               type: string
 *               description: Tempo de expiração do token
 *               example: "24h"
 *             tokenType:
 *               type: string
 *               description: Tipo do token
 *               example: "Bearer"
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Fazer login apenas para gerar o token, coloque qualquer usuario e senha
 *     description: Autentica o usuário e retorna um token JWT válido por 24 horas para acesso às rotas protegidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             example:
 *               success: true
 *               message: "Login realizado com sucesso"
 *               data:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0NTIzNjAwLCJleHAiOjE2OTQ2MTAwMDB9..."
 *                 expiresIn: "24h"
 *                 tokenType: "Bearer"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Dados inválidos"
 *               errors: ["Username é obrigatório", "Password é obrigatório"]
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *             example:
 *               success: false
 *               message: "Credenciais inválidas"
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
router.post('/login', authController.login.bind(authController))

export { router as authRoutes }
