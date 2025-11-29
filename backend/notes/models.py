from django.db import models
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=7, default="#FFFFFF") 
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='categories')

    class Meta:
        unique_together = ('name', 'owner')
        verbose_name_plural = "Categories"

    def __str__(self):
        return f"{self.name} ({self.owner.email})"

class Note(models.Model):
    title = models.CharField(max_length=255, blank=True, default="")
    content = models.TextField(blank=True, default="")
    
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='notes')
    
    
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notes')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.title or 'Untitled'} - {self.category.name}"