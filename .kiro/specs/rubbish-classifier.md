# Rubbish Classification API Specification

## Overview
A simple AI-powered API that classifies waste/rubbish photos into categories for proper recycling and disposal.

## Requirements

### Functional Requirements
- **FR1**: Accept photo uploads via HTTP POST
- **FR2**: Classify waste into categories: plastic, paper, glass, metal, organic, hazardous, unknown
- **FR3**: Return classification results as JSON
- **FR4**: Handle various image formats (JPEG, PNG, etc.)
- **FR5**: Provide fallback classification when AI is unavailable

### Non-Functional Requirements
- **NFR1**: Response time < 5 seconds for classification
- **NFR2**: Support concurrent requests
- **NFR3**: Handle rate limiting gracefully
- **NFR4**: Provide clear error messages

## API Endpoints

### POST /category
**Purpose**: Classify waste photo and return category
**Input**: Multipart form data with image file
**Output**: 
```json
{
  "category": "plastic"
}
```

### GET /test
**Purpose**: Health check endpoint
**Output**:
```json
{
  "message": "API is working!",
  "timestamp": "2025-09-14T..."
}
```

## Implementation Details

### Core Components
1. **api-server.js** - Express.js server handling HTTP requests
2. **minimal-rubbish-classifier.js** - AI classification logic using OpenAI Vision API
3. **simple-photo-test.html** - Web interface for testing

### Classification Logic
1. Receive image via HTTP POST
2. Convert to base64 format
3. Send to OpenAI Vision API with waste classification prompt
4. Map AI response to predefined categories using keyword matching
5. Return category or fallback to "plastic" if AI unavailable

### Error Handling
- Rate limiting: Fallback to most common category (plastic)
- Invalid images: Return error message
- Network issues: Graceful degradation

## Testing Strategy
- Unit tests for classification mapping
- Integration tests for API endpoints
- Manual testing with various waste photos
- Performance testing for response times

## Deployment
- Local development: `node api-server.js`
- Environment variables: OpenAI API key in `.env.prod`
- Dependencies: express, cors, multer, dotenv

## Success Criteria
- ✅ Accurately classifies common household waste
- ✅ Handles API failures gracefully
- ✅ Simple web interface for testing
- ✅ Clean, maintainable code structure