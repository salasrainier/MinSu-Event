import express from "express";
import profileRoutes from "./routes/profileRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use("/", profileRoutes);

// List all routes
console.log('📋 Registered routes:');
app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    const methods = Object.keys(r.route.methods).join(', ').toUpperCase();
    console.log(`  ${methods} ${r.route.path}`);
  }
});

process.exit(0);
