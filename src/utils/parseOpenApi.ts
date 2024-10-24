// utils/textParser.ts

/**
 * Function to parse response text into JSON object
 * @param text - The input text to parse
 * @returns An object containing the parsed key-value pairs in camelCase
 */
export function parseResponseToJSON(text: string): Record<string, string> {
    const result: Record<string, string> = {};
    
    // Split the text by line breaks
    const lines = text.trim().split('\n');
    
    // Helper function to convert keys to camelCase
    const toCamelCase = (str: string) => {
        return str
            .toLowerCase()
            .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => 
                index === 0 ? match.toLowerCase() : match.toUpperCase()
            )
            .replace(/\s+/g, ''); // Remove spaces
    };

    // Iterate over each line and extract key-value pairs
    lines.forEach(line => {
        const match = line.match(/\*\*(.+?)\*\*: (.+)/); // Match "**Key**: Value"
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim();
            result[toCamelCase(key)] = value;
        }
    });
    
    return result;
}
