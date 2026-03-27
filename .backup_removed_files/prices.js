// Backup of removed API route pages/api/prices.js
// This file was archived by the cleanup script. If you need to restore
// the original API endpoint, copy this file back to `pages/api/prices.js`.

export default function handler(_req, res) {
  res.status(410).json({ error: 'Price search has been removed from this application' })
}
