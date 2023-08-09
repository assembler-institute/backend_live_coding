import {PrismaClient as MongoClient} from "../../prisma/generated/mongodb_client";
import {PrismaClient as PostgresClient} from "../../prisma/generated/postgresql_client";

export const DATA_SOURCE = process.env.DATA_SOURCE ?? "mongo"

interface ClientType {
    [key: string]: MongoClient | PostgresClient;
}

export const mongoClient = new MongoClient();
export const postgresClient = new PostgresClient();

const clients: ClientType = {
    mongo: mongoClient,
    postgres: postgresClient,
};

export default clients[DATA_SOURCE as keyof ClientType];




