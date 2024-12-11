from django.db import models  # type: ignore

class Tags(models.Model):
    name = models.CharField(max_length=255)
    color = models.CharField(max_length=7)