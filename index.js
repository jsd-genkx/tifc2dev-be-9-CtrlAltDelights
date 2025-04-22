const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Simulated data for API
const books = [
  { id: 1, title: "1984", author: "George Orwell", genre: "Dystopian" },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
  },
];

// Filter books by genre (optional)
app.get("/books", (req, res, next) => {
  setTimeout(() => {
    const { genre } = req.query;
   
    if (genre) {
      const filteredBooks = books.filter((book) => book.genre.includes(genre));
      res.json(filteredBooks);
    } else {
      // ถ้าไม่ได้ระบุ genre ให้ส่งหนังสือทั้งหมด
      res.json(books);
    }
  }, 1000); // Simulate a 1-second delay
});

// GET specific book by ID with async/await
app.get("/books/:id", async (req, res, next) => {
  try {
    // เพิ่ม try/catch เพื่อจัดการกับข้อผิดพลาด
    const book = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundBook = books.find(
          (b) => b.id === parseInt(req.params.id, 10)
        );
        if (foundBook) {
          resolve(foundBook);
        } else {
          reject(new Error("Book not found")); // ปฏิเสธ Promise เมื่อไม่พบหนังสือ
        }
      }, 1000); // Simulate a 1-second delay
    });
    // ส่งข้อมูลหนังสือกลับไปหากพบ
    res.json(book);
  } catch (error) {
    // ส่งข้อผิดพลาดกลับไปหากไม่พบหนังสือ
    res.status(404).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
