ALTER TABLE cargos
    DROP CONSTRAINT cargos_status_check;

ALTER TABLE cargos
    ALTER COLUMN status TYPE cargo_status
    USING status::cargo_status;
