CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'NEW',
    http_code INT
);

INSERT INTO urls (url) VALUES ('https://google.com');
INSERT INTO urls (url) VALUES ('https://reddit.com');
