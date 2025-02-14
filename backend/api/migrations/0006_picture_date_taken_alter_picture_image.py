# Generated by Django 5.1.3 on 2024-12-27 00:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_picture_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='picture',
            name='date_taken',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='picture',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='picture/'),
        ),
    ]
