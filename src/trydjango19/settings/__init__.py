from .base import *

try:
	from .local_settings import *
except Error as e:
	print("No local settings detected. You can optionally create a local_settings.py file under src/trydjango19/settings/ .")
	print(e)

try:
	from .production_settings import *
except Error as e:
	print("No production settings detected. You can optionally create a production_settings.py file under src/trydjango19/settings/ .")
	print(e)