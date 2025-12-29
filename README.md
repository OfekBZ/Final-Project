

README – Book Explorer
תיאור הפרויקט

Book Explorer היא אפליקציית Full-Stack לניהול ספרים. המערכת כוללת הרשמה והתחברות, ניהול ספרים, סימון מועדפים, הוספת ביקורות ודירוגים, מערכת הרשאות (User/Admin), ועמוד אדמין לניהול משתמשים ונתוני מערכת.
הפרויקט פותח בהתאם לדרישות המרצה ובשימוש ב־React, Node.js, Express, MongoDB ו־JWT.

טכנולוגיות

Front-End:
React (JSX), Vite, React Router, CSS Modules, LocalStorage, Theme Light/Dark.

Back-End:
Node.js, Express, MongoDB + Mongoose, JWT Authentication, Joi Validation, REST API.

תכונות עיקריות

הרשמה והתחברות עם JWT + שמירת משתמש ב־LocalStorage

צפייה ברשימת ספרים, סינון וחיפוש

תצוגת Grid/Table

עמוד פרטי ספר

מועדפים (הוספה/הסרה + עמוד Favorites)

הוספת ביקורת + דירוג, מחיקת ביקורת לפי הרשאות

Dashboard אדמין: סטטיסטיקות מערכת וניהול משתמשים (שינוי Role/מחיקה)

תמיכה בתצוגת Dark/Light
שימוש ב־MongoDB Atlas


משתמש אדמין:
email: admin@admin.com
pw:Admin1234!

התקנה והרצה
 (Server)
cd server
npm install

 .env:
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000

הרצה:
npm run dev

 (Client)
cd client
npm install
npm run dev


הערה:

המערכת מבוססת על MongoDB Atlas, ללא קבצים מקומיים.


א



