from django.db import models # type: ignore

class Skills(models.Model):
    name = models.CharField(max_length=22, unique=True)