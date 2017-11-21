from rest_framework import permissions


class IsOwn(permissions.BasePermission):

    def has_permission(self, request, view):
        pk = request.resolver_match.kwargs.get('pk')
        if str(request.user.id) == pk:
            return True
