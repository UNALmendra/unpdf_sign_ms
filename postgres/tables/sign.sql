BEGIN TRANSACTION;

CREATE TABLE signs (
    id_sign serial PRIMARY KEY,
    id_user VARCHAR(100), 
    image_url VARCHAR(100),
    alt_firma VARCHAR(100)
);

COMMIT;
