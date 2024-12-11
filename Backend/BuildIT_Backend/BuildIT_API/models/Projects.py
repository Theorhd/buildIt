from django.db import models # type: ignore

from .Users import Users

class Projects(models.Model):
    tagname = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(Users, on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)