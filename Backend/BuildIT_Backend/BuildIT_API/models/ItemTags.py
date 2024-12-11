from django.db import models # type: ignore

from .Items import Items
from .Tags import Tags

class ItemTags(models.Model):
    item = models.ForeignKey(Items, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tags, on_delete=models.CASCADE)