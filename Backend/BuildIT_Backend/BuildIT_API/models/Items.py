from django.db import models # type: ignore

from .Users import Users
from .Lists import Lists

class Items(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    priority = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    risk = models.CharField(max_length=255)
    effort = models.CharField(max_length=255)
    placement = models.CharField(max_length=255)
    date_start = models.DateField()
    date_end = models.DateField()
    created_by = models.ForeignKey(Users, on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)
    list = models.ForeignKey(Lists, related_name='items', on_delete=models.CASCADE)