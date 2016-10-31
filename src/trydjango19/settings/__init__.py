from .base import *

try:
	from .local_settings import *
except:
	pass

try:
	from .production_settings import *
except:
	pass