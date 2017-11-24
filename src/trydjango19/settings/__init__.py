
from .base import *

try:
    from .local_settings import *
except ImportError as e:
    pass  # you can optionally include a local_settings.py in this folder

try:
    from .production_settings import *
except ImportError as e:
    pass  # you can optionally include a production_settings.py in this folder
