import sqlite3, os

db_path = r'D:\新文科比赛\database\gaoyou_heritage.db'
sql_path = r'D:\新文科比赛\database\gaoyou_heritage.sql'

if os.path.exists(db_path):
    os.remove(db_path)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

with open(sql_path, 'r', encoding='utf-8') as f:
    sql_content = f.read()

cursor.executescript(sql_content)
conn.commit()

cursor.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
tables = cursor.fetchall()
print('=== Database created ===')
print('Path:', db_path)
print('Size:', os.path.getsize(db_path), 'bytes')
print('Tables:', len(tables))
for t in tables:
    cursor.execute('SELECT COUNT(*) FROM ' + t[0])
    count = cursor.fetchone()[0]
    print('  -', t[0], ':', count, 'rows')

conn.close()
