// Simple test script without dependencies
(async () => {
  const baseURL = "http://localhost:3000";
  
  try {
    console.log("🧪 Testing Login Flow\n");

    // Step 1: Login with fetch
    console.log("Step 1: POST /auth/login");
    console.log("Body: { email: 'organizer@test.com', password: 'password123' }\n");
    
    const loginRes = await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: "organizer@test.com",
        password: "password123"
      })
    });
    
    const loginData = await loginRes.json();
    console.log("Login Response:", loginData);
    console.log("Response Status:", loginRes.status);
    console.log("");

    // Step 2: Wait a bit
    console.log("Waiting 2 seconds for session to settle...");
    await new Promise(r => setTimeout(r, 2000));
    console.log("");

    // Step 3: Access organizer dashboard
    console.log("Step 2: GET /organizer/dashboard");
    const dashRes = await fetch(`${baseURL}/organizer/dashboard`, {
      method: "GET",
      credentials: "include"
    });
    
    const dashData = await dashRes.text();
    console.log("Dashboard Response Status:", dashRes.status);
    console.log("Dashboard Contains 'Organizer Dashboard':", dashData.includes("Organizer Dashboard"));
    console.log("Dashboard Contains 'redirect':", dashData.includes("redirect"));
    console.log("Dashboard Length:", dashData.length);
    
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
  
  process.exit(0);
})();
