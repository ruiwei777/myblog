from rest_framework import permissions


class WriteOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'POST' or request.method == 'GET':
            return True
