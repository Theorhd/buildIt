from django.db import models # type: ignore

from .Lists import Lists
from .Skills import Skills

class ListSkills(models.Model):
    list = models.ForeignKey(Lists, on_delete=models.CASCADE)
    skill = models.ForeignKey(Skills, on_delete=models.CASCADE)