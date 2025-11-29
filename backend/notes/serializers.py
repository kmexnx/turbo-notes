from rest_framework import serializers
from .models import Note, Category

class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for the Category model.
    Used to populate the sidebar filters in the Frontend.
    """
    class Meta:
        model = Category
        fields = ['id', 'name', 'color']
        # 'owner' is excluded because it's inferred from the request


class NoteSerializer(serializers.ModelSerializer):
    """
    Serializer for the Note model.
    Includes flattened data from Category to make Frontend life easier.
    """
    # Nested serializer: Instead of just returning category ID (e.g., 1),
    # we return the category name (e.g., "School").
    # ReadOnly because when writing, we might want to send the ID or Name differently.
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_color = serializers.CharField(source='category.color', read_only=True)
    
    # We accept category_id for writes (creating/updating a note)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), 
        source='category', 
        write_only=True
    )

    # Date formatting for the UI
    created_at_formatted = serializers.DateTimeField(source='created_at', format="%b %d, %Y", read_only=True)
    updated_at_formatted = serializers.DateTimeField(source='updated_at', format="%H:%M %p", read_only=True)

    class Meta:
        model = Note
        fields = [
            'id', 
            'title', 
            'content', 
            'category_id',   # Input (Write)
            'category_name', # Output (Read)
            'category_color',# Output (Read)
            'created_at', 
            'updated_at',
            'created_at_formatted',
            'updated_at_formatted'
        ]
        read_only_fields = ['owner']

    def validate_category_id(self, value):
        """
        Security check: Ensure the user can only assign notes to THEIR own categories.
        """
        user = self.context['request'].user
        if value.owner != user:
            raise serializers.ValidationError("You cannot assign a note to a category that doesn't belong to you.")
        return value