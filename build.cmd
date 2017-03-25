@echo off
electron-packager . Playtime --platform=win32 --arch=all --asar=true --app-version=1.0.0 --app-copyright="Copyright (C) 2015 CarlosEDBA Softwares. All rights reserved." --version-string.CompanyName="CarlosEDBA Softwares." --version-string.FileDescription="Playtime Sky" --version-string.ProductName="Playtime" --version-string.InternalName="Playtime Sky" --overwrite
pause