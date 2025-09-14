# Rubbish Classification API

A simple AI-powered API that classifies waste photos into categories for proper recycling. **Built with Kiro AI assistance.**

## 🤖 How Kiro Helped Build This Classifier

**Kiro AI was instrumental in developing this rubbish classification system:**

### **Code Development**
- **Wrote the core classifier logic** (`minimal-rubbish-classifier.js`) with OpenAI Vision API integration
- **Built the Express API server** (`api-server.js`) with proper error handling and CORS support
- **Created the web interface** (`simple-photo-test.html`) for easy photo testing
- **Implemented smart fallback logic** when AI services are unavailable

### **Problem Solving & Debugging**
- **Diagnosed API rate limiting issues** and implemented graceful degradation
- **Fixed classification mapping bugs** that were causing incorrect categorization
- **Enhanced keyword matching** for better plastic detection accuracy
- **Optimized error handling** for production reliability

### **Code Quality & Best Practices**
- **Applied consistent coding standards** through Kiro steering rules
- **Implemented proper async/await patterns** and error boundaries
- **Added comprehensive JSDoc documentation** for all functions
- **Structured the project** following Node.js best practices

## Project Structure

```
├── api-server.js                    # Main HTTP server (Kiro-built)
├── minimal-rubbish-classifier.js    # AI classification logic (Kiro-built)
├── simple-photo-test.html          # Web testing interface (Kiro-built)
├── package.json                    # Dependencies
├── .env.prod                       # Environment configuration
├── .kiro/                          # Kiro project management
│   ├── specs/rubbish-classifier.md # Project specifications
│   ├── hooks/                      # Automated workflows
│   └── steering/coding-standards.md # Development guidelines
└── README.md                       # This file
```

## 🚀 Quick Start

1. **Prerequisites**
   - Node.js 18+
   - OpenAI API key

2. **Setup & Run**
   ```bash
   # Clone the repository
   git clone https://github.com/Joycee-index/Rubbish-classifier.git
   cd Rubbish-classifier

   # Install dependencies
   npm install

   # Add your OpenAI API key to .env.prod
   echo "OPENAI_API_KEY=your-key-here" >> .env.prod

   # Start the API server
   node api-server.js
   ```

3. **Test the Classifier**
   - Open `simple-photo-test.html` in your browser
   - Upload a photo of waste/rubbish
   - Get instant category classification!

## 📡 API Endpoints

### POST /category
Classify a waste photo and return its category.

**Request:** Multipart form data with image file
**Response:**
```json
{
  "category": "plastic"
}
```

**Categories:** `plastic`, `paper`, `glass`, `metal`, `organic`, `hazardous`, `unknown`

### GET /test
Health check endpoint to verify API is running.

## 🧠 How It Works

1. **Photo Upload**: User uploads waste photo via web interface or API
2. **AI Analysis**: OpenAI Vision API analyzes the image content
3. **Category Mapping**: Kiro-built logic maps AI response to waste categories
4. **Smart Fallback**: If AI is unavailable, uses intelligent fallback classification
5. **JSON Response**: Returns category for proper waste sorting

## 🎯 Kiro's Technical Contributions

### **Classification Algorithm**
```javascript
// Kiro designed this classification flow:
async getCategory(image) {
    const base64Image = await this.prepareImage(image);
    const category = await this.classifyImage(base64Image);
    return category; // plastic, paper, glass, metal, organic, hazardous, unknown
}
```

### **Enhanced Keyword Mapping**
Kiro implemented comprehensive keyword matching for accurate categorization:
- **Plastic**: bottles, containers, bags, styrofoam, packaging
- **Paper**: cardboard, newspapers, receipts, pizza boxes
- **Glass**: jars, bottles, glassware
- **Metal**: cans, aluminum foil, bottle caps
- **Organic**: food waste, fruit peels, coffee grounds
- **Hazardous**: batteries, electronics, chemicals

### **Error Handling & Resilience**
- Rate limit detection and graceful fallback
- Network error recovery
- Invalid image format handling
- Comprehensive logging for debugging

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **AI**: OpenAI Vision API (GPT-4 Vision)
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Development**: Kiro AI assistance for coding, debugging, and optimization

## 📈 Future Enhancements

- Custom ML model training with waste-specific datasets
- Real-time confidence scoring
- Multi-language support
- Mobile app integration
- Batch processing capabilities

---

**Built with ❤️ and Kiro AI assistance** - Demonstrating how AI can accelerate development while maintaining code quality and best practices.