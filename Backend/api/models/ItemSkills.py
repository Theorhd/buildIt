from django.db import models # type: ignore

from .Items import Items
from .Skills import Skills

class ItemSkills(models.Model):
    item = models.ForeignKey(Items, on_delete=models.CASCADE)
    skill = models.ForeignKey(Skills, on_delete=models.CASCADE)