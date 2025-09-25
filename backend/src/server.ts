import express, { Router } from "express";
import { env } from "./env";
import cors from "cors";
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { registerRoutes } from "./routes/index";
import { loggingMiddleware } from "./middlewares/loggingMiddleware";


const server = async () => {
  const PORT = env.PORT;
  const apiRouter = Router();
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(loggingMiddleware);

  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API feita para o teste do grupo Polgo '
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
          description: 'Development server'
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      }
    },
    apis: ['./src/routes/*.ts']
  }
  
  const specs = swaggerJsdoc(swaggerOptions)

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs))

  registerRoutes(apiRouter)
  app.use('/api', apiRouter)

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📚 API docs: http://localhost:${PORT}/api/docs`)
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`)
  })
};

server();