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
        queryset = Note.objects.filter(owner=self.request.user).order_by('-updated_at')
        category_id = self.request.query_params.get('category')
        if category_id is not None:
            queryset = queryset.filter(category__id=category_id)
        return queryset

    def perform_create(self, serializer):
        user = self.request.user
        category = serializer.validated_data.get('category')

        if not category:
            # Assign "Random Thoughts" by default
            default_cat = Category.objects.filter(owner=user, name="Random Thoughts").first()
            # Fallback if specific category doesn't exist
            if not default_cat:
                default_cat = Category.objects.filter(owner=user).first()
            
            serializer.save(owner=user, category=default_cat)
        else:
            serializer.save(owner=user)