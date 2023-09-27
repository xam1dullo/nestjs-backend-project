# nestjs-backend

Nestjs backend application

# Тестовое задание для fullstack разработчиков на NestJS

Целью тестового задания является проверка наличия знаний у кандидата или способности к самостоятельному изучению технологий и инструментов, требуемых для выполнения задания.

## Технические требования:

1. Задание должно быть решено на **Typescript**
2. Использовать фреймворк **NestJS**
3. Использовать **PostgreSQL** в качестве базы данных
4. Использовать **TypeORM** для работы с БД
5. Использовать **Queues** для работы с MQ c използованием **Redis**
6. Использовать **Socket.io** для обеспечивающая двустороннюю связь между клиентами и серверами в режиме реального времени
7. Использовать **Swagger**
8. Использовать **Docker**. Создайте docker-compose.yaml с помощью которого можно было запустит вес проект
9. В результате выполнения задачи должен быть реализован **GraphQL API** с ипользованием [code-first подхода](https://docs.nestjs.com/graphql/quick-start#code-first)
10. Использовать фреймворк Vue3 для Dashboard, шаблон дизайна на ваше усмотрение.

## Задача

Перед вами стоит задача - разработать бэкенд и фронтэнд для хранения личного расписания, состоящего из множества мероприятий.

#### Основные требования:

1. Мероприятие должно иметь следующие поля:
    - Дата начала
    - Дата окончания
    - Наименование
    - Описание
2. У пользователя должна быть возможность
    - Привязать мероприятие к местоположению

#### Ключевые Методы API:

1. Создание мероприятия
2. Редактирование мероприятия
3. Удаление мероприятия
4. Получение списка мероприятий с фильтрами по:
    - Интервалу дат
    - Привязанной сущности местоположения
5. Создание местоположения
6. Редактирование местоположения
7. Удаление местоположения
8. Получение списка доступных местоположений

## Дополнительное задание\*

Добавить в API авторизацию при помощи JWT и сделать так, чтобы множество пользователей могло вести свои личные расписания одновременно.

##

При проверке тестового задания, в первую очередь, мы проверим функциональность приложения, соответствие техническому заданию, а код — соответствует ли он лучшим практикам, файловой структуре, чистоте и читабельности кода.

Если есть сомнения по деталям - принимайте решение сами, но в свой файл README.md рекомендуем записывать вопросы и принятые по ним решения. В будущем мы можем обсудить это во время интервью. Если у тебя есть

---

Certainly! Here's an explanation of the task in Uzbek language:

## Uchastkarlarni Tekshirish Uchun Full-Stack Dasturchilar Uchun Test Vazifa

Test vazifa maqsadi, kandidatning bilimlarini yoki kerakli texnologiyalarni va vositalarni o'z-o'zini o'rganish qobiliyatini tekshirishdir, qo'llaniladigan yechimni bajarish uchun.

## Texnik Talablar:

1. Vazifa **TypeScript**da hal qilingan bo'lishi kerak.
2. **NestJS** freymvorkidan foydalanish.
3. Bazaga **PostgreSQL**ni ishlatish.
4. Bazaga ishlash uchun **TypeORM**ni ishlatish.
5. Habarni tashqariga yetkazish uchun **Queues**ni, **Redis**dan foydalanish bilan ishlating.
6. Mijozlar va serverlar o'rtasida real vaqtda ikkita yo'nalishli aloqani ta'minlash uchun **Socket.io**ni ishlatish.
7. **Swagger**ni ishlatish.
8. **Docker**ni ishlatish. Loyiha o'rnatilishi oson bo'lishi uchun `docker-compose.yaml` yaratish.
9. Natijada, vazifa natijasida [kod-avvali yondashuv](https://docs.nestjs.com/graphql/quick-start#code-first)ni qo'llaydigan **GraphQL API**ni amalga oshirilishi kerak.
10. **Dashboard** uchun dizayn shabloniga o'z do'stingiz bo'yicha **Vue3** freymvorkidan foydalanish.

## Vazifa Tavsifi

Vazifa - bir nechta tadbirlardan iborat shaxsiy jadvalni saqlash uchun backend va frontendni rivojlantirishdir.

#### Asosiy Talablar:

1. Tadbir quyidagi maydonlarga ega bo'lishi kerak:
    - Boshlanish san'ati
    - Yakunlanish san'ati
    - Ism
    - Ta'rif
2. Foydalanuvchiga quyidagi imkoniyatlar berilishi kerak:
    - Tadbirni joylangan manzilga bog'lash

#### Asosiy API Usullari:

1. Tadbir yaratish.
2. Tadbirni tahrirlash.
3. Tadbirni o'chirish.
4. Tadbirlar ro'yxatini quyidagi parametrlar bo'yicha olish:
    - Sana oraliqi
    - Bog'langan joylashuv entiteti
5. Joylashuvni yaratish.
6. Joylashuvni tahrirlash.
7. Joylashuvni o'chirish.
8. mavjud joylashuvlarni ro'yxatini olish.

## Qo'shimcha Vazifa\*

Agar siz JWT asosida autentifikatsiyani amalga oshirishni xohlaysiz:

1. Lozim bo'lgan paketlarni o'rnatish:

    ```bash
    npm install @nestjs/jwt passport passport-jwt
    ```

2. Autentifikatsiya xizmatini va JWT strategiyasini yaratish.

3. GraphQL resolverylar yoki REST endpointlari uchun autentifikatsiya himoyalari amalga oshirish.

## Izox:

Test vazifasini tekshirishda, avvalo, ilova funktsionali, texnik talablar, va kodning fayl tuzilishi, kodning toza va o'qilishi talab etiladigan ta'limotlarga muvofiqlikni tekshiriladi.

Agar ma'lumotlarda, tafsilotlarda qiyinliklar bo'lsa, o'z qaroringizni qabul qiling, ammo savollaringiz va qabul qilingan qarorlaringizni o'z README.md faylingizda yozishni maslahat beramiz. Kelasi davlatda, muloqot o'tkazish va savollaringizni muloqotda baham ko'rishimiz mumkin. Agar sizda savollar bo'lsa, ularni so'rasangiz, iltimos, so'rang.
