// Price search endpoint was removed per project cleanup.
// Keep a simple handler that returns 410 Gone so callers get a clear signal.
export default function handler(_req, res) {
  res.status(410).json({ error: 'Price search has been removed from this application' })
}
