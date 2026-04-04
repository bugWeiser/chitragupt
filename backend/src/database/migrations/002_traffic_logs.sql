-- ============================================================
-- TRAFFIC LOGS TABLE (Cloud Monitoring)
-- ============================================================
CREATE TABLE IF NOT EXISTS traffic_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address   VARCHAR(45),
  method       VARCHAR(10),
  path         TEXT,
  status       INTEGER,
  duration_ms  INTEGER,
  user_agent   TEXT,
  user_id      UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_traffic_path ON traffic_logs(path);
CREATE INDEX idx_traffic_created_at ON traffic_logs(created_at);
