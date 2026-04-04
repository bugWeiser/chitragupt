UPDATE users SET role = 'admin' WHERE email = 'bug74609@gmail.com';
SELECT id, full_name, role FROM users WHERE email = 'bug74609@gmail.com';
