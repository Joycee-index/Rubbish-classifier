---
inclusion: always
---

# Rubbish Classifier Coding Standards

## Code Style Guidelines

### JavaScript Standards
- Use `const` for immutable values, `let` for variables
- Prefer async/await over Promise chains
- Include JSDoc comments for all functions
- Use descriptive variable names (e.g., `imageData` not `img`)

### Error Handling
- Always wrap API calls in try-catch blocks
- Provide meaningful error messages to users
- Log errors with context for debugging
- Implement graceful fallbacks for AI failures

### API Design Principles
- Keep endpoints simple and focused
- Return consistent JSON response formats
- Use appropriate HTTP status codes
- Include CORS headers for browser compatibility

### Classification Logic
- Map AI responses to predefined categories only
- Provide fallback classification when AI unavailable
- Use keyword matching for robust category mapping
- Default to most common category (plastic) when uncertain

## File Organization
```
├── api-server.js           # Main HTTP server
├── minimal-rubbish-classifier.js  # AI classification logic
├── simple-photo-test.html  # Web testing interface
├── .env.prod              # Environment configuration
└── package.json           # Dependencies
```

## Testing Requirements
- Test all classification categories
- Verify API endpoints respond correctly
- Handle edge cases (invalid images, network failures)
- Test with real waste photos for accuracy

## Performance Considerations
- Optimize image processing for faster classification
- Implement request timeouts
- Handle concurrent requests efficiently
- Monitor API rate limits