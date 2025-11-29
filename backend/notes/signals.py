# backend/notes/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import Category


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_default_categories(sender, instance, created, **kwargs):
    if created:

        defaults = [
            ("Random Thoughts", "#EF9C66"),
            ("Turbo stuff", "#FCDC94"),
            ("Personal", "#C8CFA0"),
        ]
        
        categories = [
            Category(name=name, color=color, owner=instance)
            for name, color in defaults
        ]
        Category.objects.bulk_create(categories)