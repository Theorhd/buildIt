from django.db import models # type: ignore

from .Boards import Boards

class Lists(models.Model):
    name = models.CharField(max_length=22, null=True, blank=True)
    placement = models.IntegerField(default=0)
    board = models.ForeignKey(Boards, related_name='lists', on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.pk:  # Si l'objet est créé pour la première fois
            # Récupérer la dernière valeur de placement pour ce projet
            last_placement = Lists.objects.filter(board=self.board).aggregate(max_placement=models.Max('placement'))['max_placement']
            self.placement = (last_placement or 0) + 1
        super(Lists, self).save(*args, **kwargs)