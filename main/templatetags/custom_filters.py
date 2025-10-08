# main/templatetags/custom_filters.py

from django import template

register = template.Library()

@register.filter
def split(value, arg):
    """Sépare une chaîne de caractères par un séparateur"""
    if value:
        return value.split(arg)
    return []

@register.filter
def trim(value):
    """Supprime les espaces au début et à la fin"""
    if value:
        return value.strip()
    return value