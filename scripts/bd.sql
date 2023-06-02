CREATE EXTENSION pgcrypto;
CREATE TYPE transaction_status_enum AS ENUM('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE transaction_currency_enum AS ENUM('USD', 'COP');
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    amount DOUBLE PRECISION NOT NULL,
    user_id UUID NOT NULL,
    currency transaction_currency_enum NOT NULL,
    taxes DOUBLE PRECISION NOT NULL,
    transaction_status transaction_status_enum NOT NULL,
    created_at timestamp  NULL default current_timestamp,
    updated_at timestamp  NULL default current_timestamp
);
