# Cloudflare Tunnel Setup for Local MySQL Access

## Step 1: Download Cloudflared
Go to: https://developers.cloudflare.com/cloudflare-one/connections/connect-applications/install-and-setup/

Download the Windows version (cloudflared-windows-amd64.exe or cloudflared-windows-386.exe)

## Step 2: Place in a Known Location
Extract/place cloudflared.exe in a directory, for example:
- `C:\cloudflared\cloudflared.exe`

## Step 3: Create Tunnel to Local MySQL
Open PowerShell and run:

```powershell
C:\cloudflared\cloudflared.exe tunnel --url tcp://127.0.0.1:3306
```

**IMPORTANT**: You must keep this PowerShell window OPEN while using the tunnel. It will display output like:

```
2024-XX-XX INFO  +-------------------+----------------------+
2024-XX-XX INFO  | Trying to connect | xxx.trycloudflare.com |
2024-XX-XX INFO  +-------------------+----------------------+
```

The URL will look like: `https://xxx.trycloudflare.com` (but this is for TCP, not HTTPS - it tunnels to tcp://127.0.0.1:3306)

Actually, Cloudflare will give you a TCP connection string in the format:
`tcp://xxx.trycloudflare.com:XXXXX`

## Step 4: Copy the Tunnel URL
Once the tunnel is running, you'll see output like:
```
Your quick tunnel has been created! Visit it at (this is not for direct access)
tcp://xxx.trycloudflare.com:XXXXX -> 127.0.0.1:3306
```

Copy the entire tunnel address (e.g., `xxx.trycloudflare.com` and the port number shown)

## Step 5: Share the Tunnel URL with Agent
Once you have the tunnel running and see the connection string, provide it to the agent in this format:
```
Tunnel host: xxx.trycloudflare.com
Tunnel port: XXXXX
```

The agent will update your `.env` file and Render environment variables with this connection.

---

## Troubleshooting

**Windows Defender blocks it?**
- Click "Allow" when prompted
- Or disable the warning in Windows Defender settings

**"Permission denied" error?**
- Run PowerShell as Administrator

**Tunnel disconnects?**
- Keep the PowerShell window open
- If it closes, restart the tunnel with the same command above
