from .base import *

try:
	from .local_settings import *
except Error as e:
	print("Import local_settings failed.")
	print(e)

try:
	from .production_settings import *
except Error as e:
	print("Import production_settings failed.")
	print(e)