# تمرین دستگرمی اول
## توضیحات کلی

این برنامه از بخش های مختلفی از جمله html, css, javascript تشکیل شده است که در ادامه به توضیح هر کدام از بخش ها می پردازیم.

## توضیح بخش html
در این بخش یک تگ div برای بخش فرم وسط در نظر گرفته شده است.
سپس در این بخش به تعداد دلخواه تگ input و تگی با عنوان formula تعریف کرده ایم، قرار داده شده است.
برای این تمرین با گرفتن طول، عرض و ارتفاع یک مکعب مستطیل، حاصل ۳ مقدار زیر توسط این برنامه محاسبه می شود:
- حجم شکل: که از رابطه `x * y * z` به دست می آید.
- مساحت جانبی شکل: که شامل مجموع مساحت وجه های این شکل است و از رابطه `(x * y + y * z + x * z) * 2` محاسبه می گردد.
- محیط جانبی شکل: که شامل مجموع طول یال های این شکل است و از رابطه `(x + y + z) * 4` به دست می آید.

## توضیح بخش css
در این بخش به صفحه اصلی، فرمت داده ایم. فونت کلی استفاده شده، فونت Vazir است که در فولدر fonts قابل دسترسی است.
در هر بخش، با توجه به نیاز های آن مقادیر مورد نظر تنظیم شده است. برای طراحی responsive این صفحه، اندازه ها تا حد امکان با درصد داده شده است.
همچنین با استفاده از @media تعدادی از اندازه ها برای صفحات کوچک مانند صفحه موبایل، بازمقداردهی شده اند.
برای مثال ارتفاع input ها کوچک تر و padding ها نیز کمتر شده اند.

## توضیح بخش javascript
این بخش شامل تعداد تابع اصلی است که هر کدام را توضیح می دهیم. ابتدا به محض load شدن صفحه و درخت DOM، 
تمامی تگ های formula با استفاده از `querySelector` پیدا می شود و به ازای هر کدام، تابع `initializeFormula` صدا می شود.

### نحوه کارکرد تابع `initializeFormula`
در این تابع ابتدا یک تگ input به صورت read-only ساخته می شود تا حاصل آن فرمول درون آن نوشته شود. سپس این تگ به درخت DOM اضافه می شود تا توسط مرورگر نشان داده شود.
در مرحله دوم با استفاده از صفت evaluator تعریف شده در تگ formula، متغیر های فرمول را به کمک Regex جدا میکنیم.
از آنجا که طبق دستورالعمل داده شده، این متغیر ها همان id تگ های input تعریف شده در فایل html است، با پیدا کردن این ورودی ها 
به کمک `getElementById` ورودی های مورد نظر را دریافت می کنیم و روی آنها event تعریف می کنیم.
وظیفه این event ها این است که با هر تغییر مقدار ورودی ها، حاصل فرمول مجددا محاسبه شده و در صفحه به روزرسانی شود. این کار باعث می شود
حاصل فرمول ها طبق چیزی که خواسته شده، به صورت real-time محاسبه شود.

### نحوه کارکرد تابع `updateFormula`
با تغییر هر ورودی، تعدادی event صدا می شود که هر کدام متناظر با یک فرمول هستند و حاصل فرمول را محاسبه می کنند.
این کار درون تابع `updateFormula` انجام می شود.
در این تابع، با استفاده از id ورودی ها، تگ های آن پیدا شده و مقادیر آن گرفته می شوند.
در صورت خالی بودن یک یا تعداد بیشتری از ورودی ها، در عبارت حاصل چیزی نوشته نمی شود و همان placeholder قرار می گیرد.
در صورت تشخیص عبارتی غیر معتبر در یکی از ورودی ها، همانطور که گفته شده، عبارت Invalid Formula در خروجی نوشته می گردد.
در صورتی که هیچ کدام از اتفاقات فوق رخ ندهد و ورودی ها با موفقیت به مقادیر عددی تبدیل شوند، حاصل عبارت به کمک تابع `evaluateFormula` محاسبه می شود و در قسمت مورد نظر نوشته می شود.

### نحوه کارکرد تابع `evaluateFormula`
در این تابع ابتدا به کمک regex، متغیر ها پیدا شده و مقادیر عددی جایگزین آنها می شود.
در مرحله بعدی در ابتدای رشته حاوی این عبارت ریاضی، رشته return را اضافه می کنیم و با کمک تبدیل کننده های زبان javascript آن را تبدیل به یک تابع میکنیم.
با صدا زدن این تابع، مقدار مورد نظر محاسبه شده و خروجی به ما بازگردانده می شود.
