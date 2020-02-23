# Generated by Django 3.0.3 on 2020-02-23 10:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Stone',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('summary', models.CharField(max_length=2000)),
                ('audio_summary', models.FileField(upload_to='audio/')),
            ],
        ),
        migrations.CreateModel(
            name='Stone_samples',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(upload_to='stones')),
                ('stone', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='teacher.Stone')),
            ],
        ),
    ]