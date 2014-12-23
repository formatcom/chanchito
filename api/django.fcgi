#!/usr/bin/python
import os, sys

_PROJECT_DIR = '/home/formatcom/www/chanchito/chancito-api/chanchito'
sys.path.insert(0, _PROJECT_DIR)
sys.path.insert(0, os.path.dirname(_PROJECT_DIR))

_PROJECT_NAME = _PROJECT_DIR.split('/')[-1]
os.environ['DJANGO_SETTINGS_MODULE'] = "%s.settings" % _PROJECT_NAME

from django.core.servers.fastcgi import runfastcgi
runfastcgi(method="threaded", deamonize="false")
