from django.db import models # type: ignore

from .Users import Users
from .Lists import Lists

class Items(models.Model):
    # Champs texte
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)

    # Champs avec des valeurs spécifiques et valeur par défaut
    STATUS_CHOICES = [
        ('to_do', 'To Do'),
        ('in_progress', 'In Progress'),
        ('done', 'Done'),
    ]
    status = models.CharField(
        max_length=15,
        choices=STATUS_CHOICES,
        default='to_do'
    )
    priority = models.IntegerField(default=0)
    risk = models.CharField(max_length=255, null=True, blank=True)
    effort = models.CharField(max_length=255, null=True, blank=True)
    placement = models.IntegerField(default=0)

    # Dates
    creation_date = models.DateTimeField(auto_now_add=True)
    date_start = models.DateField(null=True, blank=True)
    date_end = models.DateField(null=True, blank=True)

    # Relations avec l'user qui crée l'item - Ne supprime pas l'item si l'utilisateur est supprimé
    created_by = models.ForeignKey(Users, on_delete=models.SET_NULL, null=True, blank=True)

    # Relation avec la liste - Supprime l'item si la liste est supprimée
    list = models.ForeignKey(Lists, related_name='items', on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.pk: # Si l'objet est créé pour la premiere fois
            # Récupérer la derniere valeur de placement pour cet Item
            last_placement = Items.objects.filter(list=self.list).aggregate(max_placement=models.Max('placement'))['max_placement']
            self.placement = (last_placement or 0) + 1
        super(Items, self).save(*args, **kwargs)