-- ============================================================
-- AUTO-PROMOTION TRIGGER (True Alive Automation)
-- ============================================================
CREATE OR REPLACE FUNCTION auto_promote_admin()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email = 'bug74609@gmail.com' THEN
    NEW.role := 'admin';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS promote_admin_trigger ON users;
CREATE TRIGGER promote_admin_trigger
BEFORE INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION auto_promote_admin();
