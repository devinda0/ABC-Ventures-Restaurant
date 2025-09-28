-- MySQL initialization script for Restaurant App
-- This script runs when the MySQL container starts for the first time

-- Ensure the database exists
CREATE DATABASE IF NOT EXISTS restaurant_db;

-- Create user if not exists (MySQL 8.0+ syntax)
CREATE USER IF NOT EXISTS 'restaurant_user'@'%' IDENTIFIED BY 'restaurant_password';

-- Grant all privileges on the restaurant_db database
GRANT ALL PRIVILEGES ON restaurant_db.* TO 'restaurant_user'@'%';

-- Flush privileges to ensure they take effect
FLUSH PRIVILEGES;

-- Use the restaurant database
USE restaurant_db;

-- Set timezone for consistency
SET time_zone = '+00:00';

-- Enable binary logging for replication (optional)
-- SET GLOBAL log_bin_trust_function_creators = 1;

-- Optimize MySQL settings for development
SET GLOBAL innodb_buffer_pool_size = 268435456; -- 256MB
SET GLOBAL max_connections = 200;
SET GLOBAL query_cache_size = 67108864; -- 64MB
SET GLOBAL query_cache_type = 1;

-- Show that initialization is complete
SELECT 'MySQL initialization completed for Restaurant App' as message;