/**
 * Minimal Rubbish Classifier
 * Input: Photo of rubbish
 * Output: Points earned
 */

class MinimalRubbishClassifier {
    constructor(apiKey) {
        this.apiKey = apiKey;

        // Points per gram for each category
        this.pointsMultipliers = {
            'metal': 0.03,
            'plastic': 0.02,
            'glass': 0.015,
            'paper': 0.01,
            'organic': 0.005,
            'hazardous': 0.0,
            'unknown': 0.0
        };
    }

    /**
     * Classify rubbish photo and return ONLY the category
     * @param {string|File} image - Image to analyze
     * @returns {Promise<string>} Category name (metal, plastic, glass, paper, organic, hazardous, unknown)
     */
    async getCategory(image) {
        try {
            // Convert image to base64 if needed
            const base64Image = await this.prepareImage(image);

            // Classify with AI and return category only
            const category = await this.classifyImage(base64Image);

            return category;

        } catch (error) {
            console.error('Classification failed:', error.message);
            return 'unknown'; // Return unknown on failure
        }
    }

    /**
     * Classify rubbish photo and return points
     * @param {string|File} image - Image to analyze
     * @param {number} weight - Weight in grams (optional, will estimate if not provided)
     * @returns {Promise<number>} Points earned
     */
    async getPoints(image, weight = null) {
        try {
            // Convert image to base64 if needed
            const base64Image = await this.prepareImage(image);

            // Classify with AI
            const category = await this.classifyImage(base64Image);

            // Estimate weight if not provided
            const finalWeight = weight || this.estimateWeight(category);

            // Calculate and return points
            return this.calculatePoints(finalWeight, category);

        } catch (error) {
            console.error('Classification failed:', error.message);
            return 0; // Return 0 points on failure
        }
    }

    /**
     * Classify image using OpenAI with fallback
     */
    async classifyImage(base64Image) {
        try {
            // Try OpenAI first
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "gpt-4o",
                    messages: [{
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: "Look at this waste item and classify it into ONE category: plastic, paper, glass, metal, organic, hazardous, or unknown. Respond with just the category name. Examples: toilet paper = paper, aluminum can = metal, plastic bottle = plastic, unidentifiable item = unknown."
                            },
                            {
                                type: "image_url",
                                image_url: { url: base64Image, detail: "low" }
                            }
                        ]
                    }],
                    max_tokens: 20,
                    temperature: 0
                })
            });

            if (!response.ok) {
                console.log(`⚠️ OpenAI API error: ${response.status}, using fallback classification`);
                return this.fallbackClassification();
            }

            const data = await response.json();
            const aiResponse = data.choices[0]?.message?.content?.toLowerCase().trim();

            // Map AI response to our categories
            const category = this.mapToCategory(aiResponse);

            console.log(`AI said: "${aiResponse}" -> Mapped to: "${category}"`);
            return category;
            
        } catch (error) {
            console.log(`⚠️ OpenAI classification failed: ${error.message}, using fallback`);
            return this.fallbackClassification();
        }
    }

    /**
     * Simple fallback classification when AI is not available
     */
    fallbackClassification() {
        // For demo purposes, return a random realistic category
        const categories = ['plastic', 'paper', 'glass', 'metal', 'organic'];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        
        console.log(`🎲 Fallback classification: ${randomCategory}`);
        return randomCategory;
    }

    /**
     * Map AI response to our categories
     */
    mapToCategory(aiResponse) {
        if (!aiResponse) return 'plastic';

        // Direct matches
        if (this.pointsMultipliers.hasOwnProperty(aiResponse)) {
            return aiResponse;
        }

        // Keyword mapping for common AI responses
        const categoryKeywords = {
            'paper': ['paper', 'cardboard', 'newspaper', 'magazine', 'book', 'receipt', 'tissue', 'toilet paper', 'napkin', 'document'],
            'plastic': ['plastic', 'bottle', 'container', 'bag', 'packaging', 'wrapper', 'cup', 'straw', 'utensil'],
            'glass': ['glass', 'jar', 'bottle glass', 'window', 'mirror', 'glassware'],
            'metal': ['metal', 'aluminum', 'can', 'tin', 'steel', 'copper', 'iron', 'foil'],
            'organic': ['organic', 'food', 'fruit', 'vegetable', 'compost', 'biodegradable', 'apple', 'banana', 'waste food'],
            'hazardous': ['battery', 'electronic', 'chemical', 'paint', 'toxic', 'dangerous', 'hazardous', 'medical']
        };

        // Check for keyword matches
        for (const [category, keywords] of Object.entries(categoryKeywords)) {
            if (keywords.some(keyword => aiResponse.includes(keyword))) {
                return category;
            }
        }

        // Default fallback
        return 'unknown';
    }

    /**
     * Estimate weight based on category
     */
    estimateWeight(category) {
        const averageWeights = {
            'plastic': 50,
            'paper': 25,
            'glass': 200,
            'metal': 30,
            'organic': 100,
            'hazardous': 50,
            'unknown': 50
        };
        return averageWeights[category] || 50;
    }

    /**
     * Calculate points from weight and category
     */
    calculatePoints(weight, category) {
        const multiplier = this.pointsMultipliers[category] || 0;
        let points = weight * multiplier;

        // Minimum 0.1 points for items under 5g
        if (weight > 0 && weight < 5 && multiplier > 0 && points < 0.1) {
            points = 0.1;
        }

        return Math.round(points * 10) / 10;
    }

    /**
     * Convert image to base64
     */
    async prepareImage(image) {
        if (typeof image === 'string') {
            return image.startsWith('data:') ? image : `data:image/jpeg;base64,${image}`;
        } else if (image instanceof File) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(image);
            });
        } else {
            throw new Error('Invalid image format');
        }
    }
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MinimalRubbishClassifier;
} else if (typeof window !== 'undefined') {
    window.MinimalRubbishClassifier = MinimalRubbishClassifier;
}