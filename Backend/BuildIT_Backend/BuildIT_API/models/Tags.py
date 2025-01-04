from django.db import models  # type: ignore
from .Projects import Projects

class Tags(models.Model):
    name = models.CharField(max_length=22)
    color = models.CharField(max_length=7)
    project = models.ForeignKey(Projects, on_delete=models.CASCADE, related_name='tags', null=True, blank=True)