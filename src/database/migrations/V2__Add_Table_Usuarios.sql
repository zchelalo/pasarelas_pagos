CREATE TABLE "usuarios" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "nombre" varchar(255) NOT NULL,
  "correo" varchar(255) UNIQUE NOT NULL,
  "password" text NOT NULL,
  "recovery_token" VARCHAR(255),
  "tipos_usuario_id" INT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY("tipos_usuario_id") REFERENCES "tipos_usuarios"("id") ON UPDATE CASCADE ON DELETE CASCADE
);