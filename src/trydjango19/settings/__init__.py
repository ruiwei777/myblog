
import logging
import sys
from .base import *


logger = logging.getLogger(__name__)


try:
    from .local_settings import *
except ImportError as e:
    logger.error('No local_settings.py detected. Under trydjango19/settings folder, run cp local_settings_default.py local_settings.py and customize all values.')
    sys.exit(1)
