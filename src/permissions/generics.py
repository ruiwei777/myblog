# Global permission classes
# some apps have their own classes, which live inside their own permissions.py

from rest_framework import permissions


class WriteOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True


class IsDelete(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'DELETE':
            return True
