import Fastify from "fastify";
import { PrismaClient } from '@prisma/client'
import cors from "@fastify/cors"

const prisma = new PrismaClient({
  log: ["query"]
})

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors, {
    origin: true,
  })

  fastify.get('/pools/count', async ()=>{
    const countPools = await prisma.pool.count()
    return {countPools}
  })

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()