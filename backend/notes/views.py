from rest_framework import viewsets, permissions
from .models import Note, Category
from .serializers import NoteSerializer, CategorySerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API Endpoint for Categories.
    ReadOnlyModelViewSet: Users can only GET (list/retrieve), not create/delete categories via API.
    (Since categories are auto-created by signals).
    """
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Security: Return ONLY categories belonging to the logged-in user
        return Category.objects.filter(owner=self.request.user)


class NoteViewSet(viewsets.ModelViewSet):
    """
    API Endpoint for Notes.
    ModelViewSet: Provides full CRUD (List, Create, Retrieve, Update, Destroy).
    """
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Security: Return ONLY notes belonging to the logged-in user
        return Note.objects.filter(owner=self.request.user).order_by('-updated_at')

    def perform_create(self, serializer):
        """
        Hook run before saving the new instance.
        We manually inject the owner from the request.user so they don't have to send it in JSON.
        """
        serializer.save(owner=self.request.user)