from django.db import models
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS
import os
# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=200)  
    content = models.TextField() 
    date = models.DateField(auto_now_add=True)
     

    def __str__(self):
        return self.title 
    
class Picture(models.Model):
    image = models.ImageField(upload_to='picture/', blank=True, null=True)
    description = models.CharField(max_length=255)
    date_taken = models.DateField(blank=True, null=True)
    latitude = models.DecimalField(max_digits=100, decimal_places=20, blank=True, null=True)
    longitude = models.DecimalField(max_digits=100, decimal_places=20, blank=True, null=True)

    def _get_decimal_from_dms(self, dms, ref):
        
        degrees, minutes, seconds = dms
        decimal = degrees + (minutes / 60.0) + (seconds / 3600.0)
        if ref in ['S', 'W']:
            decimal = -decimal
        return decimal

    def save(self, *args, **kwargs):
        if self.image:
            try:
                img = Image.open(self.image)
                exif_data = img._getexif()
                if exif_data:
                    gps_info = None
                    for tag_id, value in exif_data.items():
                        tag = TAGS.get(tag_id, tag_id)
                        if tag == "DateTimeOriginal":
                            from datetime import datetime
                            self.date_taken = datetime.strptime(value, "%Y:%m:%d %H:%M:%S").date()
                        if tag == "GPSInfo":
                            gps_info = {GPSTAGS.get(t, t): v for t, v in value.items()}

                    if gps_info:
                        gps_latitude = gps_info.get("GPSLatitude")
                        gps_latitude_ref = gps_info.get("GPSLatitudeRef")
                        gps_longitude = gps_info.get("GPSLongitude")
                        gps_longitude_ref = gps_info.get("GPSLongitudeRef")

                        if gps_latitude and gps_latitude_ref and gps_longitude and gps_longitude_ref:
                            self.latitude = self._get_decimal_from_dms(gps_latitude, gps_latitude_ref)
                            self.longitude = self._get_decimal_from_dms(gps_longitude, gps_longitude_ref)

            except Exception as e:
                print(f"Error extracting metadata: {e}")

        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.image and os.path.isfile(self.image.path):
            os.remove(self.image.path)
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.description
    
 