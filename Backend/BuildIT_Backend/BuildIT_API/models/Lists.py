from django.db import models # type: ignore

from .Boards import Boards

class Lists(models.Model):
    name = models.CharField(max_length=255)
    placement = models.CharField(max_length=255)
    board = models.ForeignKey(Boards, related_name='lists', on_delete=models.CASCADE)