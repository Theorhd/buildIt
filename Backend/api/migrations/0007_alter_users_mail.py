# Generated by Django 5.1.4 on 2024-12-27 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_boards_placement_alter_lists_placement_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='mail',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]
