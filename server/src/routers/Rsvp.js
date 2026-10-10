/*eslint no-console: 0*/

import express from 'express';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// ES module directory resolution targeting src/data/rsvps.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolved to <server-root>/src/data/rsvps.json
const DATA_FILE_PATH = path.join(__dirname, '../data/rsvps.json');

// Ensure directory and file exist without overwriting existing contents
const initializeJsonFile = () => {
  try {
    const dirPath = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE_PATH)) {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error initializing rsvps.json:', err);
  }
};

initializeJsonFile();

/**
 * POST /api/rsvp
 */
router.post('/', async (req, res) => {
  try {
    const rsvpPayload = req.body;

    console.log('Writing RSVP to:', DATA_FILE_PATH);

    if (!rsvpPayload || Object.keys(rsvpPayload).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Request body is empty or invalid JSON.',
      });
    }

    // 1. Read existing contents
    let existingRsvps = [];
    if (fs.existsSync(DATA_FILE_PATH)) {
      const rawData = await fsPromises.readFile(DATA_FILE_PATH, 'utf-8');
      try {
        existingRsvps = rawData ? JSON.parse(rawData) : [];
      } catch (parseErr) {
        console.error('JSON parse error:', parseErr.message);
        existingRsvps = [];
      }
    }

    // 2. Append new record
    const newRecord = {
      id: `rsvp_${Date.now()}`,
      submittedAt: new Date().toISOString(),
      ...rsvpPayload,
    };

    existingRsvps.push(newRecord);

    // 3. Write updated array to disk
    const jsonString = JSON.stringify(existingRsvps, null, 2);
    await fsPromises.writeFile(DATA_FILE_PATH, jsonString, 'utf-8');

    console.log(`SUCCESS: Saved record. Total items in file: ${existingRsvps.length}`);

    return res.status(200).json({
      success: true,
      message: 'RSVP saved successfully to src/data/rsvps.json.',
      data: newRecord,
    });
  } catch (error) {
    console.error('FATAL Error saving to rsvps.json:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to write RSVP details to local file.',
      error: error.message,
    });
  }
});

/**
 * GET /api/rsvp
 */
router.get('/', async (req, res) => {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return res.status(200).json([]);
    }
    const rawData = await fsPromises.readFile(DATA_FILE_PATH, 'utf-8');
    const rsvps = rawData ? JSON.parse(rawData) : [];
    return res.status(200).json(rsvps);
  } catch (error) {
    console.error('Error reading rsvps.json:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve RSVP records.',
    });
  }
});

export default router;