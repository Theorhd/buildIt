from django.db import models # type: ignore

from .Boards import Boards
from .Skills import Skills

class BoardSkills(models.Model):
    board = models.ForeignKey(Boards, on_delete=models.CASCADE)
    skill = models.ForeignKey(Skills, on_delete=models.CASCADE)