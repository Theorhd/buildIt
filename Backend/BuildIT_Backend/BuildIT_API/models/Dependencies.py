from django.db import models # type: ignore

from .Items import Items

class Dependencies(models.Model):
    item = models.ForeignKey(Items, related_name='dependencies', on_delete=models.CASCADE)
    dependent_on = models.ForeignKey(Items, related_name='dependent_items', on_delete=models.CASCADE)