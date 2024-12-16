from django.db import models # type: ignore

from .Users import Users
from .Lists import Lists

class Items(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    priority = models.CharField(max_length=255, null=True)
    status = models.CharField(max_length=255, null=True)
    risk = models.CharField(max_length=255, null=True)
    effort = models.CharField(max_length=255, null=True)
    placement = models.CharField(max_length=255, null=True)
    date_start = models.DateField(null=True, blank=True)
    date_end = models.DateField(null=True, blank=True)
    created_by = models.ForeignKey(Users, on_delete=models.CASCADE, null=True, blank=True)
    creation_date = models.DateTimeField(auto_now_add=True)
    list = models.ForeignKey(Lists, related_name='items', on_delete=models.CASCADE)