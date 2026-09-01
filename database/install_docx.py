import subprocess, sys
subprocess.check_call([sys.executable, "-m", "pip", "install", "--break-system-packages", "python-docx"])
