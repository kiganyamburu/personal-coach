/**
 * Helper middleware to check if Firebase is properly initialized
 */
export function requireFirebase(req: any, res: any, next: any) {
  // Check if Firebase environment variables are set
  if (!process.env.FIREBASE_PROJECT_ID) {
    res.status(503).json({
      error: "Firebase not configured",
      message:
        "Firebase is not configured. Please add FIREBASE_PROJECT_ID and other Firebase credentials to your .env file.",
      docs: "See SETUP.md for configuration instructions",
    });
    return;
  }
  next();
}
