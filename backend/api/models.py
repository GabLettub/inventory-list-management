from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_in_date = models.CharField(max_length=255)