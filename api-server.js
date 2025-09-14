/**
 * Simple API Server for Rubbish Classification
 * This creates an endpoint you can call from your HTML
 */

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const MinimalRubbishClassifier = require('./minimal-rubbish-classifier.js');
require('dotenv').config({ path: '.env.prod' });

const app = express();
const upload = multer();

// Enable CORS for browser requests
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize classifier with API key from environment or fallback
const apiKey = process.env.OPENAI_API_KEY || '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';
const classifier = new MinimalRubbishClassifier(apiKey);

// API endpoint: POST /classify
app.post('/classify', upload.single('image'), async (req, res) => {
    try {
        console.log('📸 Received classification request');
        console.log('Request details:', {
            hasFile: !!req.file,
            hasBody: !!req.body,
            contentType: req.headers['content-type']
        });
        
        let imageData;
        
        // Handle different input formats
        if (req.file) {
            console.log('📁 Processing file upload, size:', req.file.size);
            imageData = req.file;
        } else if (req.body.image) {
            console.log('📋 Processing base64 image');
            imageData = req.body.image;
        } else {
            console.log('❌ No image data found');
            return res.status(400).json({ 
                error: 'No image provided',
                success: false 
            });
        }
        
        // Get points from classifier
        console.log('🤖 Calling AI classifier...');
        const points = await classifier.getPoints(imageData, req.body.weight);
        
        console.log('✅ Classification complete, points:', points);
        
        // Return result
        res.json({
            success: true,
            points: points,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('❌ Classification error:', error);
        
        res.status(500).json({
            success: false,
            error: error.message,
            points: 0
        });
    }
});

// API endpoint: POST /category (returns only category)
app.post('/category', upload.single('image'), async (req, res) => {
    try {
        console.log('📸 Received category classification request');
        
        let imageData;
        
        // Handle different input formats
        if (req.file) {
            console.log('📁 Processing file upload, size:', req.file.size);
            imageData = req.file;
        } else if (req.body.image) {
            console.log('📋 Processing base64 image');
            imageData = req.body.image;
        } else {
            console.log('❌ No image data found');
            return res.status(400).json({ 
                error: 'No image provided',
                category: 'unknown'
            });
        }
        
        // Get category from classifier
        console.log('🤖 Calling AI classifier for category...');
        const category = await classifier.getCategory(imageData);
        
        console.log('✅ Classification complete, category:', category);
        
        // Return only the category
        res.json({
            category: category
        });
        
    } catch (error) {
        console.error('❌ Classification error:', error);
        
        res.status(500).json({
            error: error.message,
            category: 'unknown'
        });
    }
});

// Add a test endpoint
app.get('/test', (req, res) => {
    res.json({ 
        message: 'API is working!', 
        timestamp: new Date().toISOString() 
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'Rubbish Classifier API' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Rubbish Classifier API running on port ${PORT}`);
    console.log(`📡 Endpoint: http://localhost:${PORT}/classify`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;