from django.db import models  # type: ignore

class Tags(models.Model):
    name = models.CharField(max_length=22)
    color = models.CharField(max_length=7)