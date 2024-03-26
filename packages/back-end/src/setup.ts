import { sql } from "./lib/postgres"

async function setup() {
    const tableExists = await sql`
        SELECT EXISTS (
            SELECT FROM
                information_schema.tables
            WHERE
                table_schema = 'public' AND
                table_name = 'short_links'
        );
    `

    if (tableExists[0].exists) {
        console.error(`short_links table already exists.`);
    } else {
        await sql`
            CREATE TABLE IF NOT EXISTS short_links (
                id SERIAL PRIMARY KEY,
                code TEXT UNIQUE,
                original_url TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `

        console.info(`short_links table created.`);
    }

    await sql.end()

    console.info('Setup done successfully!')
}

setup()
