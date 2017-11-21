from rest_framework import permissions


class IsOwnAllowAny(permissions.BasePermission):
    """
    A user can CRUD itself
    """
    def has_permission(self, request, view):
        pk = request.resolver_match.kwargs.get('pk')
        if request.user.is_authenticated and str(request.user.id) == pk:
            return True
