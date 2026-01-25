const fs = require('fs').promises;
const path = require('path');

const readJsonFile = async (fileName) => {
    try {
        const filePath = path.join(__dirname, '../data', fileName);
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return []; // Return empty array if file doesn't exist
        }
        throw error;
    }
};

const writeJsonFile = async (fileName, data) => {
    const filePath = path.join(__dirname, '../data', fileName);
    // Ensure directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 4), 'utf8');
};

module.exports = { readJsonFile, writeJsonFile };
