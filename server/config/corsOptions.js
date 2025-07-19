import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
  origin: (origin, callback) => {
    console.log(`\n=== CORS CHECK ===`);
    console.log(`Request Origin: ${origin}`);
    console.log(`Allowed Origins:`, allowedOrigins);

    if (!origin) {
      console.log(`✅ No origin - allowing request`);
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log(`✅ Origin allowed: ${origin}`);
      callback(null, true);
    } else {
      console.log(`❌ Origin blocked: ${origin}`);
      console.log(`Add this to allowedOrigins: "${origin}"`);
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
    console.log(`==================\n`);
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
