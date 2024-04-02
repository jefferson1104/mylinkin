import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import { z } from 'zod'
import postgres from 'postgres'
import fs from 'fs'
import path from 'path'

import fastifySwagger, { SwaggerOptions } from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

import { sql } from './lib/postgres'
import { redis } from './lib/redis'

const app = fastify()

app.register(cors, {
    origin: true,
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
});

const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, './docs/swagger.json'), 'utf-8'));

app.register(fastifySwagger, {
    mode: 'static',
    specification: {
        document: swaggerDocument,
    },
    routePrefix: '/api/documentation',
    exposeRoute: true,
} as SwaggerOptions)

app.register(fastifySwaggerUi, {
  routePrefix: '/api/documentation',
  swagger: {
    url: '/api/documentation/json'
  }
}as any)

app.get('/:code', async (request, reply) => {
    const getLinkSchema = z.object({
        code: z.string().min(3),
    });

    const { code } = getLinkSchema.parse(request.params);

    try {
        const result = await sql`
            SELECT id, original_url, clicks FROM short_links WHERE short_links.code = ${code.toUpperCase()}
        `;

        if (result.length === 0) {
            return reply.status(400).send({ message: 'Link not found.' })
        };

        const link = result[0];
        const linkId = link.id;
        const updatedLinkClicks = link.clicks + 1;

        await sql`UPDATE short_links SET clicks = ${updatedLinkClicks} WHERE id = ${linkId}`

        await redis.zIncrBy('metrics', 1, String(link.id));

        return reply.redirect(301, link.original_url);
    } catch (error) {
        console.error('OPEN LINK ERROR: ', error);
        return reply.status(500).send({ message: 'Internal server error.' })
    }
});

app.get('/api/link/:code', async (request, reply) => {
    const getLinkSchema = z.object({
        code: z.string().min(3),
    });

    const { code } = getLinkSchema.parse(request.params);

    try {
        const result = await sql`
            SELECT *
            FROM short_links
            WHERE short_links.code =  ${code.toUpperCase()}
        `;

        if (result.length === 0) {
            return reply.status(400).send({ message: 'Link not found.' })
        };

        const link = result[0];

        console.log('LINK =>', link);

        return link;
    } catch (error) {
        console.error('GET REGISTERED LINK: ', error);
        return reply.status(500).send({ message: 'Internal server error.' })
    }
});

app.get('/api/links', async (_, reply) => {
    try {
        const result = await sql`
            SELECT *
            FROM short_links
            ORDER BY created_at DESC
        `;

        return result
    } catch (error) {
        console.error('GET LINKS ERROR: ', error)
        return reply.status(500).send({ message: 'Internal server error.' })
    }
});

app.post('/api/links', async (request, reply) => {
    const createLinkSchema = z.object({
        code: z.string().min(3),
        url: z.string().url()
    });

    const { code, url } = createLinkSchema.parse(request.body);

    try {
        const result = await sql`
            INSERT INTO short_links (code, original_url, clicks)
            VALUES (${code}, ${url}, 0)
            RETURNING id
        `;

        const link = result[0];

        return reply.status(201).send({ shortLinkId: link.id });
    } catch (error) {
        if (error instanceof postgres.PostgresError) {
            if (error.code === '23505') {
                return reply.status(400).send({ message: 'Duplicated code!'});
            };
        };

        console.error('CREATE LINK ERROR: ', error)

        return reply.status(500).send({ message: 'Internal server error.' });
    }
});

app.get('/api/metrics', async (_, reply) => {
    try {
        const result = await redis.zRangeByScoreWithScores('metrics', 0, 5);

        const metrics = result
            .sort((a, b) => b.score - a.score)
            .map(item => {
                return {
                    shortLinkId: Number(item.value),
                    clicks: item.score
                }
            });

        return metrics
    } catch (error) {
        console.error('GET METRICS ERROR: ', error);
        return reply.status(500).send({ message: 'Internal server error.' });
    }
});

const start = async () => {
    try {
        await app.listen({
            port:  process.env.PORT ? Number(process.env.PORT) : 3333,
            host: '0.0.0.0'
        });

        console.info(`HTTP server running!`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
