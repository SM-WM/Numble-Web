\echo "Delete and recreate numble db?"
\prompt "Return for yes or control-C to cancel >" answer

DROP DATABASE numble;
CREATE DATABASE numble;
\connect numble;

\i numble-schema.sql
\i numble-seed.sql