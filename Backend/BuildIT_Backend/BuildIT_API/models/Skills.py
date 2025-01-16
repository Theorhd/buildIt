from django.db import models # type: ignore

class Skills(models.Model):
    name = models.CharField(max_length=22, unique=True)
    category = models.CharField(max_length=22, null=True)
    description = models.CharField(max_length=255, null=True)